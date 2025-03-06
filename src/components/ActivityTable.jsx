import formatDateTime from "../helper/DateFormat";

const ActivityTable = ({ data }) => {

  function getTime(timestamp) {
    const milliseconds =
      timestamp._seconds * 1000 + timestamp._nanoseconds / 1e6;
    const date = new Date(milliseconds);
    return formatDateTime(date);
  }

  return (
    <div className="max-h-[24rem] overflow-y-auto rounded-lg scrollbar-custom ">
      <table className="w-full text-sm sm:text-base overflow-y-auto">
        <thead className="sticky top-0 bg-[#2b4162] ">
          <tr>
            <th className="py-3 px-3 sm:px-6  text-left text-white text-md font-title font-semibold sm:text-lg ">
              Date Time
            </th>
            <th className="py-3 px-3 sm:px-6 text-left text-white text-md font-title font-semibold sm:text-lg ">
              Function
            </th>
            <th className="py-3 px-3 sm:px-6 text-left text-white text-md font-title font-semibold sm:text-lg ">
              Status
            </th>
          </tr>
        </thead>
        {data.length !== 0 ? (
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className="border-b border-gray-100/50  hover:bg-white/90 hover:text-[#2b4162] transition duration-200 text-white text-md font-title font-medium sm:text-lg lg:text-xl"
              >
                <td className="py-4 px-3 sm:px-6   text-md font-title font-medium sm:text-lg ">
                  {getTime(row.timeStamp)||""}
                </td>
                <td className="py-4 px-3 sm:px-6   text-md font-title font-medium sm:text-lg ">
                  {row.fun}
                </td>
                <td className="py-4 px-3 sm:px-6">
                  <span
                    className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-full  text-md font-title font-medium sm:text-lg  ${
                      row.Status === "Completed"
                        ? " rounded-md bg-transparent  text-green-700 ring-2 ring-green-800/30 ring-inset"
                        : row.Status === "Failed"
                        ? " rounded-md bg-transparent  text-red-700 ring-2 ring-red-600/30 ring-inset"
                        : " rounded-md bg-transparent  text-yellow-800 ring-2 ring-yellow-600/30 ring-inset"
                    }`}
                  >
                    {row.Status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody></tbody>
        )}
      </table>
    </div>
  );
};
export default ActivityTable;
