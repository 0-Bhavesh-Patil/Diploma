"use client";

import { useState } from "react";
import { Search, MapPin, Building2, ChevronDown, ChevronUp, GraduationCap } from "lucide-react";
import polyData from "../data.json";

export default function PolytechnicDashboard() {
  const [query, setQuery] = useState("");
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  // Filter logic
  const filteredColleges = polyData.filter((college) =>
    college.name.toLowerCase().includes(query.toLowerCase()) ||
    college.code.includes(query)
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* HERO SECTION */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-blue-600">
            MahaPoly Search
          </h1>
          <p className="text-lg text-slate-500">
            Instant cutoff matrix for Maharashtra Polytechnic Institutes.
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="flex gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by college name or code..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* RESULTS GRID */}
        <div className="space-y-6">
          {filteredColleges.length === 0 ? (
            <div className="text-center text-slate-500 py-12">No colleges found.</div>
          ) : (
            filteredColleges.map((college) => (
              <div key={college.code} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex flex-col gap-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 text-xs font-bold bg-slate-100 text-slate-600 rounded-md">
                      Code: {college.code}
                    </span>
                    <span className="px-2.5 py-0.5 text-xs font-bold bg-emerald-100 text-emerald-700 rounded-md">
                      {college.status}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-blue-500" />
                    {college.name}
                  </h2>
                </div>

                <div className="p-6 bg-slate-50">
                  <div className="space-y-3">
                    {college.courses.map((course, idx) => {
                      const courseId = `${college.code}-${idx}`;
                      return (
                        <div key={courseId} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                          <button 
                            onClick={() => setExpandedCourse(expandedCourse === courseId ? null : courseId)}
                            className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <GraduationCap className="h-5 w-5 text-indigo-500" />
                              <span className="font-semibold text-left">{course.branchName}</span>
                            </div>
                            {expandedCourse === courseId ? <ChevronUp className="h-5 w-5 text-slate-400" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
                          </button>
                          
                          {expandedCourse === courseId && (
                            <div className="p-0 border-t border-slate-200 overflow-x-auto">
                              <table className="w-full text-sm text-left">
                                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                                  <tr>
                                    <th className="px-4 py-3 font-semibold">CAP Round</th>
                                    <th className="px-4 py-3 font-semibold">Seat Type</th>
                                    <th className="px-4 py-3 font-semibold">Stage</th>
                                    <th className="px-4 py-3 font-semibold text-right">Merit %</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                  {course.cutOffs.map((cutoff, cIdx) => (
                                    <tr key={cIdx} className="hover:bg-slate-50/50">
                                      <td className="px-4 py-3 font-medium text-slate-900">Round {cutoff.capRound}</td>
                                      <td className="px-4 py-3">{cutoff.seatType}</td>
                                      <td className="px-4 py-3 text-slate-500">{cutoff.stage}</td>
                                      <td className="px-4 py-3 font-bold text-right text-indigo-600">
                                        {cutoff.meritPercentage.toFixed(2)}%
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}