import React, { useEffect, useState } from "react";
import AnomaliesTable from "./components/AnomaliesTable";
import SummaryPanel from "./components/SummaryPanel";
import axios from "axios";
import { motion } from "framer-motion";
import { BarChart3, AlertTriangle } from "lucide-react";

// Backend base URL (adjust if needed)
const API_BASE = "http://127.0.0.1:8000";

export default function App() {
	const [anomalies, setAnomalies] = useState([]);
	const [summary, setSummary] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try {
				const [anomaliesRes, summaryRes] = await Promise.all([
					axios.get(`${API_BASE}/anomalies`),
					axios.get(`${API_BASE}/summary`),
				]);
				setAnomalies(anomaliesRes.data);
				setSummary(summaryRes.data);
			} catch (err) {
				setError("⚠️ Failed to fetch data from backend.");
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	}, []);

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100">
				<div className="text-center space-y-6">
					{/* Shimmering card */}
					<div className="relative h-24 w-72 mx-auto rounded-xl bg-gradient-to-r from-purple-200 via-white to-blue-200 animate-pulse overflow-hidden">
						<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent transform -translate-x-full animate-shimmer"></div>
					</div>

					{/* Bouncing dots loader */}
					<div className="flex justify-center space-x-2">
						<div className="h-4 w-4 bg-purple-400 rounded-full animate-bounce delay-75"></div>
						<div className="h-4 w-4 bg-blue-400 rounded-full animate-bounce delay-150"></div>
						<div className="h-4 w-4 bg-pink-400 rounded-full animate-bounce delay-300"></div>
					</div>

					{/* Placeholder text bars */}
					<div className="space-y-2">
						<div className="h-6 w-48 mx-auto bg-blue-200 rounded animate-pulse"></div>
						<div className="h-4 w-64 mx-auto bg-purple-200 rounded animate-pulse"></div>
					</div>
				</div>
			</div>
		);
	}

	if (error)
		return (
			<div className="flex items-center justify-center min-h-screen bg-red-50">
				<div className="p-6 bg-white shadow-lg rounded-xl text-red-600 font-semibold">
					{error}
				</div>
			</div>
		);

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 flex flex-col">
			{/* Header */}
			<header className="relative bg-gradient-to-br from-blue-700 via-purple-700 to-indigo-800 shadow-2xl py-20 mb-16 rounded-b-3xl overflow-hidden">
				{/* Animated background blobs */}
				<div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-400/30 rounded-full blur-3xl animate-pulse"></div>
				<div className="absolute top-32 -right-20 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-[pulse_6s_infinite]"></div>
				<div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

				{/* Content */}
				<div className="relative z-10 max-w-3xl mx-auto text-center px-6">
					{/* Badge */}
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1, duration: 0.6 }}
						className="inline-flex items-center px-4 py-1.5 mb-6 rounded-full text-sm font-medium bg-white/10 text-blue-100 backdrop-blur-md border border-white/20 shadow-md"
					>
						🚀 Ad Intelligence Dashboard
					</motion.div>

					{/* Title */}
					<motion.h1
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2, duration: 0.6 }}
						className="text-5xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-2xl"
					>
						Ad Insights Explorer{" "}
						<span className="text-blue-200">Lite</span>
					</motion.h1>

					{/* Subtitle */}
					<motion.p
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4, duration: 0.6 }}
						className="text-blue-100 text-lg md:text-xl mt-6 font-light leading-relaxed max-w-2xl mx-auto"
					>
						Gain{" "}
						<span className="font-semibold text-white">
							clarity
						</span>{" "}
						on your ad campaigns, detect anomalies instantly, and
						uncover insights that drive performance.
					</motion.p>
				</div>
			</header>

			{/* Main */}
			<main className="max-w-6xl mx-auto px-4 flex-1 flex flex-col gap-12">
				{/* Summary */}
				<motion.section
					initial={{ opacity: 0, y: 15 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2, duration: 0.6 }}
					className="rounded-2xl shadow-xl bg-white/80 backdrop-blur-lg p-8"
				>
					<div className="flex items-center gap-3 mb-6">
						<BarChart3 className="w-6 h-6 text-blue-600" />
						<h2 className="text-xl font-bold text-gray-800">
							Campaign Summary
						</h2>
					</div>
					<SummaryPanel summary={summary} />
				</motion.section>

				{/* Anomalies */}
				<motion.section
					initial={{ opacity: 0, y: 15 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3, duration: 0.6 }}
					className="rounded-2xl shadow-xl bg-white/90 backdrop-blur-md p-8"
				>
					<div className="flex items-center gap-3 mb-6">
						<AlertTriangle className="w-6 h-6 text-purple-600" />
						<h2 className="text-xl font-bold text-gray-800">
							Anomalies
						</h2>
					</div>
					<AnomaliesTable anomalies={anomalies} />
				</motion.section>
			</main>

			{/* Footer */}
			<footer className="text-center text-xs text-gray-400 mt-16 mb-6">
				&copy; {new Date().getFullYear()} Ad Insights Explorer Lite
			</footer>
		</div>
	);
}
