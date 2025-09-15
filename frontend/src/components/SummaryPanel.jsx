import { BarChart3, Users, TrendingUp, Sparkles } from "lucide-react";

// Tag cloud for common words
function TagCloud({ words }) {
	return (
		<div className="flex flex-wrap gap-3 mt-4">
			{words.map((word, i) => (
				<span
					key={word + i}
					className="group relative bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium shadow-lg border border-indigo-200/50 hover:scale-110 hover:shadow-xl transition-all duration-300 cursor-pointer backdrop-blur-sm hover:from-indigo-500/20 hover:to-purple-500/20"
				>
					<span className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-full blur-sm group-hover:blur-none transition-all duration-300"></span>
					<span className="relative flex items-center gap-1">
						<Sparkles className="w-3 h-3 opacity-60" />#{word}
					</span>
				</span>
			))}
		</div>
	);
}

// Panel for summary info

export default function SummaryPanel({ summary }) {
	if (!summary) return null;

	return (
		<section className="relative overflow-hidden bg-gradient-to-br from-purple-50/80 via-white/90 to-indigo-50/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-purple-200/30">
			{/* Floating background elements */}
			<div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-indigo-400/10 rounded-full blur-3xl"></div>
			<div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-2xl"></div>

			<div className="relative z-10">
				<div className="flex items-center gap-3 mb-6">
					<div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg">
						<BarChart3 className="w-6 h-6 text-white" />
					</div>
					<h2 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent">
						Campaign Summary
					</h2>
					<div className="flex-1"></div>
					<div className="animate-pulse">
						<div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full"></div>
					</div>
				</div>

				<div className="grid md:grid-cols-2 gap-8">
					<div className="space-y-4">
						<div className="flex items-center gap-2 mb-4">
							<Users className="w-5 h-5 text-indigo-600" />
							<h3 className="text-lg font-bold text-gray-800">
								Top Performers
							</h3>
							<span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-medium">
								by unique words
							</span>
						</div>

						<div className="space-y-4">
							{summary.top_users.map((u, index) => (
								<div key={u.userId} className="group relative">
									<div className="flex items-center gap-4 p-4 bg-gradient-to-r from-white/80 to-gray-50/80 rounded-2xl border border-gray-200/50 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
										<div className="flex-shrink-0">
											<div
												className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ${
													index === 0
														? "bg-gradient-to-br from-yellow-400 to-orange-500"
														: index === 1
														? "bg-gradient-to-br from-gray-400 to-gray-500"
														: "bg-gradient-to-br from-orange-400 to-red-500"
												}`}
											>
												{index + 1}
											</div>
										</div>

										<div className="flex-1">
											<div className="flex items-center gap-2 mb-1">
												<span className="font-bold text-gray-800">
													User {u.userId}
												</span>
												<span className="text-xs bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 rounded-full font-bold shadow-sm">
													{u.unique_word_count} words
												</span>
											</div>

											<div className="flex flex-wrap gap-1 mt-2">
												{u.unique_words
													.slice(0, 5)
													.map((w, i) => (
														<span
															key={w + i}
															className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md font-medium border border-gray-200"
														>
															{w}
														</span>
													))}
												{u.unique_words.length > 5 && (
													<span className="text-xs text-gray-400 px-2 py-1">
														+
														{u.unique_words.length -
															5}{" "}
														more
													</span>
												)}
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					<div>
						<div className="flex items-center gap-2 mb-4">
							<TrendingUp className="w-5 h-5 text-purple-600" />
							<h3 className="text-lg font-bold text-gray-800">
								Trending Keywords
							</h3>
						</div>
						<TagCloud words={summary.common_words} />
					</div>
				</div>
			</div>
		</section>
	);
}
