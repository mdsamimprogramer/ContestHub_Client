import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../components/Loading";

const MEDALS = ["🥇", "🥈", "🥉"];

const avatarUrl = (photo, name) =>
  photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`;

const PodiumCard = ({ user, index }) => {
  const ringColor = ["ring-yellow-400", "ring-slate-400", "ring-orange-400"][index];

  const cardStyle = [
    "border-yellow-400/30 bg-gradient-to-b from-yellow-50/60 to-white dark:from-yellow-900/10 dark:to-slate-800 scale-105 z-10",
    "border-slate-300/40 bg-white dark:bg-slate-800 mt-5",
    "border-orange-300/30 bg-white dark:bg-slate-800 mt-5",
  ][index];

  const imgSize = index === 0 ? "w-[72px] h-[72px]" : "w-[58px] h-[58px]";

  return (
    <div
      className={`flex flex-col items-center gap-2 px-4 py-5 rounded-2xl border ${cardStyle} flex-1 min-w-[120px] max-w-[190px] transition-transform duration-200 hover:-translate-y-1 cursor-default`}
    >
      <span className="text-xl leading-none">{MEDALS[index]}</span>
      <div className="relative">
        <img
          src={avatarUrl(user.photo, user.name)}
          alt={user.name}
          className={`${imgSize} rounded-full object-cover ring-2 ${ringColor}`}
        />
      </div>
      <div className="text-center min-w-0 w-full px-1">
        <p className="font-bold text-[0.88rem] text-gray-800 dark:text-white leading-tight truncate">
          {user.name}
        </p>
        <p className="text-[0.68rem] text-gray-400 truncate">{user.email}</p>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-xl font-black text-blue-600 dark:text-blue-400">
          {user.winCount ?? 0}
        </span>
        <span className="text-[0.7rem] text-gray-400 font-medium">wins</span>
      </div>
      {index === 0 && (
        <span className="text-[0.62rem] uppercase tracking-wider font-bold bg-yellow-400 text-white px-3 py-[3px] rounded-full">
          Elite
        </span>
      )}
      {index > 0 && index < 3 && (
        <span className="text-[0.62rem] uppercase tracking-wider font-bold bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-3 py-[3px] rounded-full">
          Pro
        </span>
      )}
    </div>
  );
};

const Leaderboard = () => {
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const res = await axios.get("https://contests-hub.vercel.app/leaderboard");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const top3 = users.slice(0, 3);
  const rest = users.slice(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100 dark:from-slate-900 dark:via-slate-800/70 dark:to-slate-900 transition-colors px-4 py-8 sm:px-6 sm:py-10 rounded-3xl mt-5">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block text-[0.68rem] uppercase tracking-[.18em] font-semibold text-blue-600 bg-blue-50 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-700/50 px-4 py-1 rounded-full mb-3">
            Season Rankings
          </span>
          <h1 className="font-black text-4xl sm:text-5xl text-gray-900 dark:text-white leading-tight">
            Contest{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Champions
            </span>
          </h1>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
            Top performers across all competitions
          </p>
          <div className="mt-4 mx-auto w-10 h-[3px] rounded-full bg-blue-600" />
        </div>

        {/* Podium Top 3 — reordered: 2nd, 1st, 3rd */}
        {top3.length > 0 && (
          <div className="flex justify-center items-end gap-3 sm:gap-4 mb-10 flex-wrap">
            {[top3[1], top3[0], top3[2]].map((user, displayIdx) => {
              if (!user) return null;
              const originalIndex = [1, 0, 2][displayIdx];
              return <PodiumCard key={user.email} user={user} index={originalIndex} />;
            })}
          </div>
        )}

        {/* Rest Table */}
        {rest.length > 0 && (
          <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 shadow-sm">
            {/* Table header */}
            <div className="grid grid-cols-[44px_1fr_72px_76px] sm:grid-cols-[52px_1fr_80px_88px] px-4 sm:px-5 py-3 bg-gray-50 dark:bg-slate-700/60 border-b border-gray-200 dark:border-gray-700">
              {["#", "Contestant", "Wins", "Status"].map((h, i) => (
                <span
                  key={h}
                  className={`text-[0.68rem] uppercase tracking-widest font-semibold text-gray-400 dark:text-gray-500 ${i >= 2 ? "text-center" : ""}`}
                >
                  {h}
                </span>
              ))}
            </div>

            {/* Rows */}
            {rest.map((user, i) => {
              const rank = i + 4;
              const wins = user.winCount ?? 0;
              return (
                <div
                  key={user.email}
                  className="grid grid-cols-[44px_1fr_72px_76px] sm:grid-cols-[52px_1fr_80px_88px] items-center px-4 sm:px-5 py-3 border-b last:border-0 border-gray-100 dark:border-gray-700 hover:bg-blue-50/40 dark:hover:bg-slate-700/30 transition-colors duration-150"
                >
                  {/* Rank badge */}
                  <div>
                    <span className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-slate-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center text-[0.72rem] font-semibold text-gray-500 dark:text-gray-400">
                      {rank}
                    </span>
                  </div>

                  {/* User info */}
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={avatarUrl(user.photo, user.name)}
                      alt={user.name}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl object-cover border border-gray-200 dark:border-gray-600 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-[0.83rem] text-gray-800 dark:text-white truncate">
                        {user.name}
                      </p>
                      <p className="text-[0.68rem] text-gray-400 truncate">{user.email}</p>
                    </div>
                  </div>

                  {/* Wins */}
                  <div className="text-center font-black text-base text-blue-600 dark:text-blue-400">
                    {wins}
                  </div>

                  {/* Status */}
                  <div className="flex justify-center">
                    {wins >= 5 ? (
                      <span className="text-[0.62rem] uppercase tracking-wide font-bold bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2.5 py-[3px] rounded-full">
                        Pro
                      </span>
                    ) : (
                      <span className="text-[0.62rem] uppercase tracking-wide font-semibold bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2.5 py-[3px] rounded-full border border-gray-200 dark:border-gray-600">
                        Rookie
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <p className="text-center text-[0.7rem] text-gray-400 dark:text-gray-600 mt-5">
          Updated live · Contests Hub Rankings
        </p>
      </div>
    </div>
  );
};

export default Leaderboard;