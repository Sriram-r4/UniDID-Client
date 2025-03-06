import React, { useState, useEffect, useMemo, useRef } from "react";
import LogoLarge from "../assets/logo-title-large.png";
import { getIdentities } from "../services/identityService";
import reverseDate from "../helper/DateReverser";

function SensitiveCell({ value, enhancedPrivacy }) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);
  const encryptedValue = useMemo(() => btoa(value), [value]);

  const handleToggle = () => {
    if (!visible) {
      if (enhancedPrivacy) {
        const pin = window.prompt("Enter your 4-digit PIN to reveal the data:");
        if (pin !== "1234") {
          alert("Incorrect PIN");
          return;
        }
      }
      setVisible(true);
      timerRef.current = setTimeout(() => setVisible(false), 6000);
    } else {
      setVisible(false);
      if (timerRef.current) clearTimeout(timerRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <span className="cursor-pointer" onClick={handleToggle}>
      {visible ? atob(encryptedValue) : "••••••••"}
    </span>
  );
}

function getCardGradientStyle(category) {
  switch (category) {
    case "Government IDs":
      return "ring-2 ring-[#d4a1ff]/50 bg-gradient-to-r from-[#6a0dad] via-[#a4508b] to-[#d4a1ff] border border-[#d4a1ff]/50 bg-opacity-70 backdrop-blur-md text-white";
    case "Educational IDs":
      return "ring-2 ring-[#a8e0ff]/50 bg-gradient-to-r from-[#1565c0] via-[#1e88e5] to-[#a8e0ff] border border-[#a8e0ff]/50 bg-opacity-70 backdrop-blur-md text-white";
    case "Socials":
      return "ring-2 ring-[#ffb3c1]/50 bg-gradient-to-r from-[#ff5252] via-[#ff4081] to-[#ffb3c1] border border-[#ffb3c1]/50 bg-opacity-70 backdrop-blur-md text-white";
    case "Others":
      return "ring-2 ring-[#a7e3aa]/50 bg-gradient-to-r from-[#388e3c] via-[#4caf50] to-[#a7e3aa] border border-[#a7e3aa]/50 bg-opacity-70 backdrop-blur-md text-white";
    default:
      return "ring-2 ring-gray-500 bg-gray-700 bg-opacity-70 backdrop-blur-md text-white";
  }
}

function IdentityCard({ identity, enhancedPrivacy }) {
  if (!identity) {
    return (
      <div className="p-4 text-center bg-[#2b4162] text-white rounded-lg">
        Select an identity to view details
      </div>
    );
  }

  const isSocial =
    identity.category === "Socials" ||
    (identity.category === "Others" && identity.identityType === "password");

  let headerLabel = identity.category;
  if (identity.category === "Others") {
    headerLabel =
      identity.subCategory === "password" ? "Others-Password" : "Others-ID";
  }

  const gradientClass = getCardGradientStyle(identity.category);

  const ownership = identity.idOwned;

  return (
    <div
      className={`${gradientClass} flex flex-col p-4 sm:p-6 rounded-xl shadow-lg relative`}
    >
      <div className="flex justify-between items-center">
        <span className="text-white font-medium text-lg">{headerLabel}</span>
        <div
          className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
            ownership.toLowerCase() === "you"
              ? "bg-red-500 bg-opacity-50 ring-2 ring-red-500"
              : "bg-blue-500 bg-opacity-50 ring-2 ring-blue-500"
          }`}
        >
          {ownership}
        </div>
      </div>

      <div className="mt-4">
        {isSocial ? (
          <>
            <div className="text-white font-semibold text-2xl">
              {identity.idname}
            </div>
            <div className="mt-2 text-white">
              Username: <span className="font-medium">{identity.username}</span>
            </div>
            <div className="mt-2 text-white">
              Password:{" "}
              <SensitiveCell
                value={identity.password}
                enhancedPrivacy={enhancedPrivacy}
              />
            </div>
            <div className="mt-2 text-white">
              URL:{" "}
              <a
                href={identity.webUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-300"
              >
                {identity.webUrl}
              </a>
            </div>
          </>
        ) : (
          <>
            <div className="text-white font-semibold text-2xl">
              {identity.idname}
            </div>
            <div className="mt-2 text-white">
              ID Number:{" "}
              <SensitiveCell
                value={identity.idnum}
                enhancedPrivacy={enhancedPrivacy}
              />
            </div>
            <div className="mt-2 text-white">
              Date of Issue:{" "}
              {identity.dateOfIssue ? reverseDate(identity.dateOfIssue) : "N/A"}
            </div>
          </>
        )}
      </div>

      <div className="absolute bottom-2 right-2">
        <img
          src={LogoLarge}
          alt="Logo"
          className="w-[8rem] h-[2.3rem] sm:h-[2.7rem] object-contain"
        />
      </div>
    </div>
  );
}

function DigitalWallet() {
  const [enhancedPrivacy, setEnhancedPrivacy] = useState(false);
  const categories = ["Government IDs", "Educational IDs", "Socials", "Others"];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState("number");
  const [selectedIdentity, setSelectedIdentity] = useState(null);

  const [allData, setAllData] = useState([]);
  const [walletId, setWalletId] = useState("");
  const storedWalletId = JSON.parse(localStorage.getItem("walletId"));

  useEffect(() => {
    if (storedWalletId) {
      setWalletId(storedWalletId);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const identities = await getIdentities(storedWalletId);
        setAllData(identities);
      } catch (error) {
        console.error("Error fetching identities:", error);
        setAllData([]);
      }
    };
    fetchData();
  }, []);

  const [walletData, setWalletData] = useState([]);
  useEffect(() => {
    setWalletData(allData);
  }, [allData]);

  const filteredData = useMemo(() => {
    let data = Array.isArray(allData) ? allData : []; 
    if (selectedCategory !== "All") {
      data = data.filter((item) => item.category === selectedCategory);
    }
    if (selectedCategory === "Others") {
      data = data.filter((item) => item.identityType === selectedSubCategory);
    }
    return data;
  }, [allData, selectedCategory, selectedSubCategory]);

  return (
    <div
      className="min-h-screen p-2 sm:p-4  text-white"
      style={{ fontSize: "1rem" }}
    >
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="enhancedPrivacy"
          checked={enhancedPrivacy}
          onChange={(e) => setEnhancedPrivacy(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="enhancedPrivacy">Enhanced Privacy</label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[20rem,1fr] gap-4">
        <div className="flex flex-col">
          <div className="flex flex-wrap gap-2 mb-2">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-4 py-2 rounded-xl font-title active:font-bold font-medium ${
                selectedCategory === "All"
                  ? "bg-white/90 text-[#2b4162]"
                  : "bg-[#2b4162] text-white hover:bg-white/90 hover:text-[#2b4162]"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSelectedIdentity(null);
                }}
                className={`px-4 py-2 rounded-xl font-title active:font-bold font-medium ${
                  selectedCategory === cat
                    ? "bg-white/90 text-[#2b4162]"
                    : "bg-[#2b4162] text-white hover:bg-white/90 hover:text-[#2b4162]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {selectedCategory === "Others" && (
            <div className="flex gap-2 mb-2">
              {["number", "password"].map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setSelectedSubCategory(type);
                    setSelectedIdentity(null);
                  }}
                  className={`px-4 py-2 rounded-lg font-title active:font-bold font-medium ${
                    selectedSubCategory === type
                      ? "bg-white/90 text-[#2b4162]"
                      : "bg-[#2b4162] text-white hover:bg-white/90 hover:text-[#2b4162]"
                  }`}
                >
                  {type === "number" ? "Number Based" : "Password Based"}
                </button>
              ))}
            </div>
          )}

          <div
            className="bg-[#2b4162] rounded-lg font-title font-medium  p-2 overflow-auto"
            style={{ height: "40rem" }}
          >
            {filteredData.length === 0 ? (
              <div className="p-2">No identities found.</div>
            ) : (
              <ul>
                {Array.isArray(filteredData) &&filteredData.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => setSelectedIdentity(item)}
                    className={`p-1 px-2 mb-1 cursor-pointer hover:bg-white/90 hover:text-[#2b4162] rounded ${
                      selectedIdentity && selectedIdentity.id === item.id
                        ? "bg-white/90 text-[#2b4162]"
                        : ""
                    }`}
                  >
                    {item.idname || "Unamed Identity"}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-2 p-2 bg-[#2b4162] rounded-lg text-sm">
            <p>
              {filteredData.length} identities in&nbsp;
              {selectedCategory === "All" ? "all categories" : selectedCategory}
            </p>
            <p>Total identities: {walletData.length}</p>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="mb-4">
            <IdentityCard
              identity={selectedIdentity}
              enhancedPrivacy={enhancedPrivacy}
            />
          </div>

          <div className="bg-[#2b4162] rounded-lg p-4">
            {selectedIdentity ? (
              <>
                <h3 className="text-xl font-bold px-1 sm:px-2">
                  {selectedIdentity.idname}
                </h3>
                <p className="p-1 sm:p-2">
                  Date Added:{" "}
                  {reverseDate(
                    selectedIdentity.dateAdded.toString().split("T")[0]
                  )}
                </p>

                {(selectedIdentity.category === "Government IDs" ||
                  selectedIdentity.category === "Educational IDs" ||
                  (selectedIdentity.category === "Others" &&
                    selectedIdentity.identityType === "number")) && (
                  <div>
                    <h4 className="text-lg font-title font-medium px-1 sm:px-2">
                      Uploaded File:
                    </h4>
                    <div className="p-1 sm:p-2">
                      {selectedIdentity.uploadedFile.path}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <p>Select an identity to see details</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DigitalWallet;
