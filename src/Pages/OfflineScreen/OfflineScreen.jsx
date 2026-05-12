import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWifi } from "@fortawesome/free-solid-svg-icons";
import { useOnlineStatus } from "../../hooks/useOnlineStatus";


export default function OfflineScreen({ children }) {
  const isOnline = useOnlineStatus();

  // لسه بيحدد الحالة
  if (isOnline === null) return null;

  if (isOnline) {
    return <>{children}</>;
  }

  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
       <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6 text-center">

        {/* Icon */}
         <div className="flex justify-center mb-4">
          <div className="bg-red-50 p-4 rounded-full">
            <FontAwesomeIcon
              icon={faWifi}
              className="text-red-500 text-3xl rotate-45"
            />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-2">
          Connection Lost
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-sm mb-6">
          Oops! It looks like you’ve lost your internet connection.
          Don’t worry, we’ll help you get back online.
        </p>

        {/* Status */}
        <div className="bg-gray-50 rounded-lg p-4 text-sm mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Network Status</span>
            <span className="text-red-500 font-medium">Offline</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Last Checked</span>
            <span className="text-gray-700">
              {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={() => window.location.reload()}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition"
        >
          Try Again
        </button>

        {/* Quick Fixes */}
        <div className="mt-6 text-left text-sm text-gray-500">
          <p className="font-medium text-gray-700 mb-2">
            Quick Fixes:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Check your Wi-Fi connection</li>
            <li>Try moving closer to your router</li>
            <li>Restart your router or mobile data</li>
          </ul>
        </div>

        <p className="text-xs text-gray-400 mt-6">
          Auto-checking connection every 30 seconds
        </p>
      </div>
    </div>
    </>
  );
}





// import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faWifi } from "@fortawesome/free-solid-svg-icons";
// import { useOnlineStatus } from "../../hooks/useOnlineStatus";

// export default function OfflineScreen({ children }) {
//   const isOnline = useOnlineStatus();

//   // لسه بيتأكد من الحالة
//   if (isOnline === null) return null; // أو Spinner

//   if (isOnline) {
//     return <>{children}</>;
//   }
//   // لو أوفلاين → اعرض شاشة Offline
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6 text-center">

//         {/* Icon */}
//         <div className="flex justify-center mb-4">
//           <div className="bg-red-50 p-4 rounded-full">
//             <FontAwesomeIcon
//               icon={faWifi}
//               className="text-red-500 text-3xl rotate-45"
//             />
//           </div>
//         </div>

//         {/* Title */}
//         <h2 className="text-xl font-semibold mb-2">
//           Connection Lost
//         </h2>

//         {/* Description */}
//         <p className="text-gray-500 text-sm mb-6">
//           Oops! It looks like you’ve lost your internet connection.
//           Don’t worry, we’ll help you get back online.
//         </p>

//         {/* Status */}
//         <div className="bg-gray-50 rounded-lg p-4 text-sm mb-6">
//           <div className="flex justify-between mb-2">
//             <span className="text-gray-500">Network Status</span>
//             <span className="text-red-500 font-medium">Offline</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-gray-500">Last Checked</span>
//             <span className="text-gray-700">
//               {new Date().toLocaleTimeString()}
//             </span>
//           </div>
//         </div>

//         {/* Button */}
//         <button
//           onClick={() => window.location.reload()}
//           className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition"
//         >
//           Try Again
//         </button>

//         {/* Quick Fixes */}
//         <div className="mt-6 text-left text-sm text-gray-500">
//           <p className="font-medium text-gray-700 mb-2">
//             Quick Fixes:
//           </p>
//           <ul className="list-disc list-inside space-y-1">
//             <li>Check your Wi-Fi connection</li>
//             <li>Try moving closer to your router</li>
//             <li>Restart your router or mobile data</li>
//           </ul>
//         </div>

//         <p className="text-xs text-gray-400 mt-6">
//           Auto-checking connection every 30 seconds
//         </p>
//       </div>
//     </div>
//   );
// }
