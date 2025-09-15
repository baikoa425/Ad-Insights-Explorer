import { useMemo, useState } from "react";
import { 
  AlertTriangle, 
  Search, 
  Filter, 
  Users, 
  Eye 
} from "lucide-react";

// Table for displaying anomalies with filtering and sorting
export default function AnomaliesTable({ anomalies }) {
  const [userIdFilter, setUserIdFilter] = useState("");
  const [sortKey, setSortKey] = useState("id");
  const [sortAsc, setSortAsc] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const userIds = useMemo(() => [...new Set(anomalies.map(a => a.userId))], [anomalies]);

  const filtered = useMemo(() => {
    let data = anomalies;
    
    if (userIdFilter) {
      data = data.filter(a => String(a.userId) === userIdFilter);
    }
    
    if (searchTerm) {
      data = data.filter(a => 
        a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.reason.some(r => r.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    data = [...data].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortAsc ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortAsc ? 1 : -1;
      return 0;
    });
    
    return data;
  }, [anomalies, userIdFilter, sortKey, sortAsc, searchTerm]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-red-50/80 via-white/90 to-orange-50/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-red-200/30">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-red-400/5 to-orange-400/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl shadow-lg">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-red-700 to-orange-600 bg-clip-text text-transparent">
              Anomalies Detected
            </h2>
            <div className="animate-pulse">
              <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-orange-400 rounded-full"></div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search anomalies..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-300 focus:border-red-400 bg-white/80 backdrop-blur-sm shadow-sm font-medium"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-red-300 focus:border-red-400 bg-white/80 backdrop-blur-sm shadow-sm font-medium"
                value={userIdFilter}
                onChange={e => setUserIdFilter(e.target.value)}
              >
                <option value="">All Users</option>
                {userIds.map(uid => (
                  <option key={uid} value={uid}>User {uid}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 backdrop-blur-sm">
                  {[
                    { key: 'userId', label: 'User ID' },
                    { key: 'id', label: 'Ad ID' },
                    { key: 'title', label: 'Title' },
                    { key: 'reason', label: 'Anomaly Type' }
                  ].map(col => (
                    <th
                      key={col.key}
                      className={`px-6 py-4 text-left font-bold text-gray-700 ${
                        col.key !== 'reason' ? 'cursor-pointer hover:bg-gray-200/50 transition-colors' : ''
                      }`}
                      onClick={() => {
                        if (col.key === 'reason') return;
                        if (sortKey === col.key) setSortAsc(a => !a);
                        else { setSortKey(col.key); setSortAsc(true); }
                      }}
                    >
                      <div className="flex items-center gap-2">
                        {col.key === 'userId' && <Users className="w-4 h-4" />}
                        {col.key === 'id' && <Eye className="w-4 h-4" />}
                        {col.key === 'title' && <Search className="w-4 h-4" />}
                        {col.key === 'reason' && <AlertTriangle className="w-4 h-4" />}
                        {col.label}
                        {sortKey === col.key && (
                          <span className="text-red-500">
                            {sortAsc ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/50">
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="p-3 bg-gray-100 rounded-full">
                          <Search className="w-6 h-6 text-gray-400" />
                        </div>
                        <p className="text-gray-500 font-medium">No anomalies found matching your criteria</p>
                      </div>
                    </td>
                  </tr>
                )}
                {filtered.map((a, index) => (
                  <tr key={a.id + '-' + a.userId} className="hover:bg-gradient-to-r hover:from-red-50/50 hover:to-orange-50/50 transition-all duration-200 group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                          {a.userId}
                        </div>
                        <span className="font-semibold text-gray-800">User {a.userId}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg font-mono text-sm font-medium border border-gray-200 shadow-sm">
                        #{a.id}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <div className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 px-4 py-2 rounded-xl font-medium shadow-sm border border-indigo-200/50 truncate" title={a.title}>
                          {a.title}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {a.reason.map((r, i) => {
                          const isBot = r.toLowerCase().includes('bot');
                          const isHigh = r.toLowerCase().includes('high') || r.toLowerCase().includes('duplicate');
                          
                          return (
                            <span
                              key={i}
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold shadow-lg border ${
                                isBot 
                                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white border-red-300' 
                                  : isHigh 
                                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white border-orange-300'
                                    : 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-yellow-300'
                              }`}
                            >
                              <AlertTriangle className="w-3 h-3" />
                              {r}
                            </span>
                          );
                        })}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {filtered.length > 0 && (
          <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
            <span>Showing {filtered.length} anomal{filtered.length === 1 ? 'y' : 'ies'}</span>
            <span className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              Critical issues require immediate attention
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
