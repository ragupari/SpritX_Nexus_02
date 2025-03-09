import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

const fetchTournamentStats = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/players");
    if (!response.ok) throw new Error("Failed to fetch data");

    const result = await response.json();
    // console.log("result:", result);

    if (!result || !Array.isArray(result.data)) {
      throw new Error("Invalid API response format: Expected an array under 'data'");
    }

    const players = result.data; 
    // console.log("players:", players);

    let totalRuns = 0;
    let totalWickets = 0;
    let topRunScorer = { Name: "N/A", Total_Runs: 0 };
    let topWicketTaker = { Name: "N/A", Wickets: 0 };

    players.forEach((player) => {
      totalRuns += player.Total_Runs;
      totalWickets += player.Wickets;

      if (player.Total_Runs > topRunScorer.Total_Runs) {
        topRunScorer = { Name: player.Name, Runs: player.Total_Runs };
      }

      if (player.Wickets > topWicketTaker.Wickets) {
        topWicketTaker = { Name: player.Name, Wickets: player.Wickets };
      }
    });

    return [
      {
        color: "gray",
        icon: BanknotesIcon,
        title: "Overall Runs",
        value: totalRuns.toString(),
        footer: {
          color: "text-green-500",
          value: "",
          label: "Total runs scored in the tournament",
        },
      },
      {
        color: "gray",
        icon: UsersIcon,
        title: "Overall Wickets",
        value: totalWickets.toString(),
        footer: {
          color: "text-green-500",
          value: "",
          label: "Total wickets taken in the tournament",
        },
      },
      {
        color: "gray",
        icon: UserPlusIcon,
        title: "Highest Run Scorer",
        value: `${topRunScorer.Name} (${topRunScorer.Runs} runs)`,
        footer: {
          color: "text-blue-500",
          value: "",
          label: "Top scorer in the tournament",
        },
      },
      {
        color: "gray",
        icon: ChartBarIcon,
        title: "Highest Wicket Taker",
        value: `${topWicketTaker.Name} (${topWicketTaker.Wickets} wickets)`,
        footer: {
          color: "text-red-500",
          value: "",
          label: "Most wickets taken in the tournament",
        },
      },
    ];
  } catch (error) {
    console.error("Error fetching player stats:", error);
    return [];
  }
};

export default fetchTournamentStats;
