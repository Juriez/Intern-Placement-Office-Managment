import React, { createContext, useState, useContext } from 'react';

const CompanyContext = createContext();

export const useCompanyContext = () => useContext(CompanyContext);

export const CompanyProvider = ({ children }) => {
  const [companies, setCompanies] = useState([]);
  
  const addCompanyDetail = (company) => {
    setCompanies((prev) => [...prev, company]);
  };

  return (
    <CompanyContext.Provider value={{ companies, addCompanyDetail }}>
      {children}
    </CompanyContext.Provider>
  );
};
