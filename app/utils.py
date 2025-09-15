import re
from collections import Counter
from typing import List, Dict, Set


# -----------------------------
# Tokenization
# -----------------------------
def tokenize(text: str) -> List[str]:
    """
    Tokenize a string into lowercase words, ignoring punctuation.

    Example:
        >>> tokenize("Hello, World!")
        ['hello', 'world']
    """
    return re.findall(r"\b\w+\b", text.lower())


# -----------------------------
# Word Statistics
# -----------------------------
def count_words_in_titles(posts: List[Dict]) -> Counter:
    """
    Count word frequency across all post titles.

    Args:
        posts (List[Dict]): List of posts, each containing a 'title'.

    Returns:
        Counter: Word frequency counter.
    """
    counter = Counter()
    for post in posts:
        counter.update(tokenize(post["title"]))
    return counter


def get_user_title_words(posts: List[Dict]) -> Dict[int, Set[str]]:
    """
    Map each userId to the set of unique words they have used in titles.

    Args:
        posts (List[Dict]): List of posts with 'userId' and 'title'.

    Returns:
        Dict[int, Set[str]]: Mapping from userId → set of unique words.
    """
    user_words: Dict[int, Set[str]] = {}
    for post in posts:
        user_words.setdefault(post["userId"], set()).update(tokenize(post["title"]))
    return user_words


# -----------------------------
# Similarity Check
# -----------------------------
def similar_title(title1: str, title2: str, threshold: float = 0.7) -> bool:
    """
    Check if two titles are similar based on word overlap ratio.

    Args:
        title1 (str): First title.
        title2 (str): Second title.
        threshold (float): Similarity threshold (default=0.7).

    Returns:
        bool: True if titles are considered similar.
    """
    words1, words2 = set(tokenize(title1)), set(tokenize(title2))
    if not words1 or not words2:
        return False

    overlap = words1 & words2
    similarity = len(overlap) / max(len(words1), len(words2))
    return similarity > threshold