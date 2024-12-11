import React, { useContext, useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { DocumentContext } from "../context/documents";
import axios from "axios";

const SearchBar = ({ page }) => {
  const { setDocuments, documentTypes } = useContext(DocumentContext);
  const [localSearchName, setLocalSearchName] = useState("");
  const [localSearchNumber, setLocalSearchNumber] = useState("");
  const [localCreatedDate, setLocalCreatedDate] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [documentPermition, setDocumentPermition] = useState("");

  const fetchDocuments = useCallback(async () => {
    const queryParams = new URLSearchParams();
    if (page) queryParams.append("page", page);
    if (localSearchName) queryParams.append("title", localSearchName);
    if (localSearchNumber)
      queryParams.append("document_number", localSearchNumber);
    if (localCreatedDate) queryParams.append("created_at", localCreatedDate);
    if (documentType) queryParams.append("type", documentType);
    if (documentPermition) queryParams.append("permission", documentPermition);

    const url = `http://127.0.0.1:8000/v1/documents/?${queryParams.toString()}`;
    console.log(url);

    try {
      const response = await axios.get(url);
      const data = response;
      setDocuments(data.data.results);
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch documents:", error);
    }
  }, [
    localSearchName,
    localSearchNumber,
    localCreatedDate,
    documentType,
    setDocuments,
    documentPermition,
    page,
  ]);

  const debouncedFetchDocuments = debounce(fetchDocuments, 200);

  useEffect(() => {
    debouncedFetchDocuments();
    return () => debouncedFetchDocuments.cancel();
  }, [
    localSearchName,
    localSearchNumber,
    localCreatedDate,
    documentType,
    documentPermition,
    page,
  ]);

  return (
    <div className="search-bar" style={{maxWidth: '100%', height: 60}}>
      <input
        type="text"
        placeholder="hujjat nomi"
        value={localSearchName}
        onChange={(e) => setLocalSearchName(e.target.value)}
        className="search-input"
      />

      <input
        type="text"
        placeholder="hujjat raqami"
        value={localSearchNumber}
        onChange={(e) => setLocalSearchNumber(e.target.value)}
        className="search-input"
      />

      <input
        type="date"
        value={localCreatedDate}
        onChange={(e) => setLocalCreatedDate(e.target.value)}
        className="search-input"
      />

      <select
        style={{ width: 300 }}
        className="form-select my-1"
        value={documentType}
        onChange={(e) => setDocumentType(e.target.value)}
      >
        <option value="">All types</option>
        {documentTypes.length > 0 ? (
          documentTypes.map((type) => (
            <option key={type.id} value={type.name}>
              {type.name}
            </option>
          ))
        ) : (
          <option disabled>
            typelar topilmadi
          </option>
        )}
      </select>
      {/* <select
        placeholder={"sdasda"}
        style={{ width: 400 }}
        className="form-select form-select-lg"
        value={documentPermition}
        onChange={(e) => setDocumentPermition(e.target.value)}
        aria-label="Select document type"
      >
        <option value="" selected disabled>
          permission
        </option>
        <option value="">All</option>
        <option value="DEPARTMENT">Departmant</option>
        <option value="PUBLIC">Public</option>
        <option value="PRIVATE">Private</option>
      </select> */}
    </div>
  );
};

export default SearchBar;
