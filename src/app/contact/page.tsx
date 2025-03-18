'use client';

import ContactView from "./view/ContactView";

const ContactPage = () => {
  const handleFetchData = async () => {
    const response = await fetch("/api/mongoose", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    const data = await response.json();
    console.log(data);
  };

  return <ContactView handleFetchData={handleFetchData} />;
};

export default ContactPage;
