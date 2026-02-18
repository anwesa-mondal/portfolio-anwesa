"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { BackgroundGradient } from "../ui/background-gradient";
import { SiLeetcode, SiCodechef, SiCodeforces } from "react-icons/si";
import Link from "next/link";

const VariableProximity = dynamic(() => import("../VariableProximity"), {
  ssr: false,
  loading: () => <div className="text-4xl text-violet-300">COMPETITIVE PROGRAMMING</div>
});

interface LeetCodeStats {
  totalSolved: number;
  totalSubmissions: Array<{
    difficulty: "All" | "Easy" | "Medium" | "Hard";
    count: number;
    submissions: number;
  }>;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  ranking: number;
  contributionPoint: number;
  reputation: number;
}

interface CodeChefStats {
  username: string;
  avatar: string; // Add avatar since it's in the response
  rating: string; // Changed to number to match the API response shown later, usually API returns number or string parseable to number
  stars: number;
  country: string;
  globalRank: number;
  countryRank: number;
}

interface CodeforcesStats {
  handle: string;
  rating: string;
  rank: string;
  maxRating: string;
  contributions: string;
  color: string;
  titlePhoto: string;
}

export default function CompetitiveProgramming() {
    const [stats, setStats] = useState<LeetCodeStats | null>(null);
    const [codeChefStats, setCodeChefStats] = useState<CodeChefStats | null>(null);
    const [codeforcesStats, setCodeforcesStats] = useState<CodeforcesStats | null>(null);
    // Added error states to diagnose/handle failed fetches
    const [statsError, setStatsError] = useState<boolean>(false);
    const [codeChefError, setCodeChefError] = useState<boolean>(false);
    const [codeforcesError, setCodeforcesError] = useState<boolean>(false);
    const containerRef = useRef(null);

    useEffect(() => {
        // Fetch from our local API routes instead of directly to avoid CORS
        fetch("/api/leetcode")
            .then(res => {
                if (!res.ok) throw new Error("LeetCode fetch failed");
                return res.json();
            })
            .then(data => setStats(data))
            .catch(err => {
                console.error("LeetCode API Error:", err);
                setStatsError(true);
            });

        fetch("/api/codechef")
            .then(res => {
               if (!res.ok) throw new Error("CodeChef fetch failed");
               return res.json();
            })
            .then(data => setCodeChefStats(data))
            .catch(err => {
                console.error("CodeChef API Error:", err);
                setCodeChefError(true);
            });

        fetch("/api/codeforces")
            .then(res => {
               if (!res.ok) throw new Error("Codeforces fetch failed");
               return res.json();
            })
            .then(data => setCodeforcesStats(data))
            .catch(err => {
                console.error("Codeforces API Error:", err);
                setCodeforcesError(true);
            });
    }, []);

    return (
        <section id="competitive-programming" className="w-full py-20 relative">
            <div ref={containerRef} className="mb-20 w-[80%] mx-auto flex justify-start relative">
                <VariableProximity
                    label={"COMPETITIVE PROGRAMMING"}
                    className={"text-4xl md:text-6xl text-violet-300 hover:text-blue-300 transition-colors duration-100 font-bold text-center"}
                    fromFontVariationSettings="'wght' 400, 'opsz' 9"
                    toFontVariationSettings="'wght' 1000, 'opsz' 40"
                    containerRef={containerRef}
                    radius={100}
                    falloff="linear"
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* LeetCode Card */}
                <BackgroundGradient className="rounded-[22px] bg-zinc-900 p-8 sm:p-10 h-full">
                    <div className="flex flex-col gap-8 items-center h-full">
                        <div className="w-full space-y-4">
                            <div className="flex items-center gap-4 mb-6">
                                <SiLeetcode className="text-5xl text-[#FFA116]" />
                                <div>
                                    <h3 className="text-2xl font-bold text-white">LeetCode Profile</h3>
                                    <Link 
                                        href="https://leetcode.com/u/Coder-crooz-v2/" 
                                        target="_blank"
                                        className="text-blue-400 hover:text-blue-300 text-sm"
                                    >
                                        @Coder-crooz-v2
                                    </Link>
                                </div>
                            </div>
                            
                            {stats ? (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-zinc-800/50 p-4 rounded-xl text-center border border-zinc-700 col-span-2">
                                            <div className="text-3xl font-bold text-white mb-1">{stats.totalSolved}</div>
                                            <div className="text-xs text-zinc-400 uppercase tracking-wider">Total Solved</div>
                                        </div>
                                        <div className="bg-zinc-800/50 p-4 rounded-xl text-center border border-green-900/30">
                                            <div className="text-2xl font-bold text-green-400 mb-1">{stats.easySolved}</div>
                                            <div className="text-xs text-green-400/70 uppercase tracking-wider">Easy</div>
                                        </div>
                                        <div className="bg-zinc-800/50 p-4 rounded-xl text-center border border-yellow-900/30">
                                            <div className="text-2xl font-bold text-yellow-400 mb-1">{stats.mediumSolved}</div>
                                            <div className="text-xs text-yellow-400/70 uppercase tracking-wider">Medium</div>
                                        </div>
                                        <div className="bg-zinc-800/50 p-4 rounded-xl text-center border border-red-900/30 col-span-2">
                                            <div className="text-2xl font-bold text-red-500 mb-1">{stats.hardSolved}</div>
                                            <div className="text-xs text-red-500/70 uppercase tracking-wider">Hard</div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm text-zinc-400 mb-1">
                                            <span>Progress</span>
                                            <span>{Math.round((stats.totalSolved / stats.totalQuestions) * 100)}% of all questions</span>
                                        </div>
                                        <div className="h-4 w-full bg-zinc-800 rounded-full overflow-hidden flex">
                                            <div 
                                                className="h-full bg-green-500" 
                                                style={{ width: `${(stats.easySolved / stats.totalSolved) * 100}%` }}
                                            />
                                            <div 
                                                className="h-full bg-yellow-500" 
                                                style={{ width: `${(stats.mediumSolved / stats.totalSolved) * 100}%` }}
                                            />
                                            <div 
                                                className="h-full bg-red-500" 
                                                style={{ width: `${(stats.hardSolved / stats.totalSolved) * 100}%` }}
                                            />
                                        </div>
                                        <div className="flex justify-between text-xs text-zinc-500">
                                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"/> Easy</span>
                                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-500"/> Medium</span>
                                            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500"/> Hard</span>
                                        </div>
                                    </div>
                                </div>
                            ) : statsError ? (
                                <div className="text-red-400 text-center py-10">Unable to load LeetCode stats.</div>
                            ) : (
                                <div className="text-zinc-500 animate-pulse">Loading stats...</div>
                            )}
                        </div>
                    </div>
                </BackgroundGradient>

                {/* CodeChef Card */}
                <BackgroundGradient className="rounded-[22px] bg-zinc-900 p-8 sm:p-10 h-full">
                    <div className="flex flex-col gap-8 items-center h-full">
                        <div className="w-full space-y-4">
                            <div className="flex items-center gap-4 mb-6">
                                <SiCodechef className="text-5xl text-[#5B4638]" />
                                <div>
                                    <h3 className="text-2xl font-bold text-white">CodeChef Profile</h3>
                                    <Link 
                                        href="https://www.codechef.com/users/blue_coder09" 
                                        target="_blank"
                                        className="text-blue-400 hover:text-blue-300 text-sm"
                                    >
                                        @blue_coder09
                                    </Link>
                                </div>
                            </div>
                            
                            {codeChefStats ? (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-zinc-800/50 p-4 rounded-xl text-center border border-zinc-700 col-span-2">
                                            <div className="text-3xl font-bold text-white mb-1 flex items-center justify-center gap-2">
                                                {codeChefStats.stars} <span className="text-yellow-500">★</span>
                                            </div>
                                            <div className="text-xs text-zinc-400 uppercase tracking-wider">Stars</div>
                                        </div>
                                        
                                        <div className="bg-zinc-800/50 p-4 rounded-xl text-center border border-blue-900/30">
                                            <div className="text-2xl font-bold text-blue-400 mb-1">{codeChefStats.rating}</div>
                                            <div className="text-xs text-blue-400/70 uppercase tracking-wider">Rating</div>
                                        </div>

                                        <div className="bg-zinc-800/50 p-4 rounded-xl text-center border border-purple-900/30">
                                            <div className="text-xl font-bold text-purple-400 mb-1 truncate px-2" title={codeChefStats.country}>
                                                {codeChefStats.country}
                                            </div>
                                            <div className="text-xs text-purple-400/70 uppercase tracking-wider">Country</div>
                                        </div>
                                    </div>

                                    <div className="space-y-3 pt-4 border-t border-zinc-800">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-zinc-400">Global Rank</span>
                                            <span className="text-white font-mono">#{codeChefStats.globalRank}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-zinc-400">Country Rank</span>
                                            <span className="text-white font-mono">#{codeChefStats.countryRank}</span>
                                        </div>
                                    </div>
                                </div>
                            ) : codeChefError ? (
                                <div className="text-red-400 text-center py-10">Unable to load CodeChef stats.</div>
                            ) : (
                                <div className="text-zinc-500 animate-pulse text-center py-10">Loading CodeChef stats...</div>
                            )}
                        </div>
                    </div>
                </BackgroundGradient>

                {/* Codeforces Card */}
                <BackgroundGradient className="rounded-[22px] bg-zinc-900 p-8 sm:p-10 h-full">
                    <div className="flex flex-col gap-8 items-center h-full">
                        <div className="w-full space-y-4">
                            <div className="flex items-center gap-4 mb-6">
                                <SiCodeforces className="text-5xl text-[#1f8dd6]" />
                                <div>
                                    <h3 className="text-2xl font-bold text-white">Codeforces Profile</h3>
                                    <Link 
                                        href="https://codeforces.com/profile/Coder-crooz-v2" 
                                        target="_blank"
                                        className="text-blue-400 hover:text-blue-300 text-sm"
                                    >
                                        @Coder-crooz-v2
                                    </Link>
                                </div>
                            </div>
                            
                            {codeforcesStats ? (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-zinc-800/50 p-4 rounded-xl text-center border border-zinc-700 col-span-2">
                                            <div className="text-3xl font-bold text-white mb-1 uppercase text-green-500">
                                                {codeforcesStats.rank}
                                            </div>
                                            <div className="text-xs text-zinc-400 uppercase tracking-wider">Rank</div>
                                        </div>
                                        
                                        <div className="bg-zinc-800/50 p-4 rounded-xl text-center border border-blue-900/30">
                                            <div className="text-2xl font-bold text-blue-400 mb-1">{codeforcesStats.rating}</div>
                                            <div className="text-xs text-blue-400/70 uppercase tracking-wider">Rating</div>
                                        </div>

                                        <div className="bg-zinc-800/50 p-4 rounded-xl text-center border border-purple-900/30">
                                            <div className="text-2xl font-bold text-purple-400 mb-1">
                                                {codeforcesStats.maxRating}
                                            </div>
                                            <div className="text-xs text-purple-400/70 uppercase tracking-wider">Max Rating</div>
                                        </div>
                                    </div>
                                </div>
                            ) : codeforcesError ? (
                                <div className="text-red-400 text-center py-10">Unable to load Codeforces stats.</div>
                            ) : (
                                <div className="text-zinc-500 animate-pulse text-center py-10">Loading Codeforces stats...</div>
                            )}
                        </div>
                    </div>
                </BackgroundGradient>
            </div>
        </section>
    );
}
