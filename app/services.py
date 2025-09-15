import statistics
from typing import List, Dict
import httpx
from difflib import SequenceMatcher

from .models import Anomaly, SummaryResponse, SummaryUser
from .utils import count_words_in_titles, get_user_title_words

# External API
JSONPLACEHOLDER_URL = "https://jsonplaceholder.typicode.com/posts"


# -----------------------------
# Data Fetching
# -----------------------------
async def fetch_posts() -> List[Dict]:
	"""
	Fetch posts asynchronously from JSONPlaceholder API.
	"""
	async with httpx.AsyncClient() as client:
		response = await client.get(JSONPLACEHOLDER_URL)
		response.raise_for_status()
		return response.json()


# -----------------------------
# Anomaly Detection
# -----------------------------
import statistics
from typing import List, Dict
from difflib import SequenceMatcher
from .models import Anomaly

def find_anomalies(posts: List[Dict]) -> List[Anomaly]:
    """
    Detect anomalies in posts using multiple heuristics:
      1. Title shorter than 15 characters
      2. Duplicate or repeated titles
      3. Posting bursts (many posts in short ID range)
      4. Users with many semantically similar titles
    """
    anomalies: List[Anomaly] = []
    user_posts: Dict[int, List[Dict]] = {}

    # Group posts by user
    for post in posts:
        user_posts.setdefault(post["userId"], []).append(post)

    # Process each user's posts
    for user, posts_list in user_posts.items():
        titles = [p["title"] for p in posts_list]
        lengths = [len(t) for t in titles]

        for post in posts_list:
            reasons = []

            # 1️⃣ Short title
            if len(post["title"]) < 15:
                reasons.append("Title shorter than 15 characters")

        # 2️⃣ Duplicate titles
        seen_titles = {}
        for post in posts_list:
            normalized = post["title"].lower().strip()
            if normalized in seen_titles:
                seen_titles[normalized] += 1
            else:
                seen_titles[normalized] = 1

        for post in posts_list:
            normalized = post["title"].lower().strip()
            if seen_titles[normalized] > 1:
                reasons = ["Duplicate or repeated title"]
                anomalies.append(Anomaly(
                    userId=user,
                    id=post["id"],
                    title=post["title"],
                    reason=reasons
                ))

        # 3️⃣ Posting bursts
        post_ids = sorted([p["id"] for p in posts_list])
        for i in range(len(post_ids) - 4):
            if post_ids[i + 4] - post_ids[i] < 5:  # 5 posts in <5 IDs
                for p in posts_list:
                    anomalies.append(Anomaly(
                        userId=user,
                        id=p["id"],
                        title=p["title"],
                        reason=["Possible posting burst (bot-like behavior)"]
                    ))
                break

        # 4️⃣ Semantic similarity
        similar_count = 0
        for i in range(len(titles)):
            for j in range(i + 1, len(titles)):
                ratio = SequenceMatcher(None, titles[i], titles[j]).ratio()
                if ratio > 0.85:
                    similar_count += 1

        if similar_count > len(titles) // 2:
            for p in posts_list:
                anomalies.append(Anomaly(
                    userId=user,
                    id=p["id"],
                    title=p["title"],
                    reason=["Too many semantically similar titles (possible automation)"]
                ))

        # 5️⃣ Add short title anomalies
        for post in posts_list:
            if len(post["title"]) < 15:
                anomalies.append(Anomaly(
                    userId=user,
                    id=post["id"],
                    title=post["title"],
                    reason=["Title shorter than 15 characters"]
                ))

    return anomalies

# -----------------------------
# Summary Generation
# -----------------------------
def get_summary(posts: List[Dict]) -> SummaryResponse:
	"""
	Generate a summary of posts:
		- Top 3 users with most unique words in titles
		- 10 most common words overall
	"""
	# User word statistics
	user_words = get_user_title_words(posts)
	user_word_counts = [(user, len(words), words) for user, words in user_words.items()]
	user_word_counts.sort(key=lambda x: x[1], reverse=True)

	top_users = [
		SummaryUser(
			userId=user,
			unique_word_count=count,
			unique_words=sorted(list(words))
		)
		for user, count, words in user_word_counts[:3]
	]

	# Global word statistics
	word_counter = count_words_in_titles(posts)
	common_words = [word for word, _ in word_counter.most_common(10)]

	return SummaryResponse(top_users=top_users, common_words=common_words)