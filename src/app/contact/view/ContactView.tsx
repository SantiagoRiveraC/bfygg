const ContactView = ({ handleFetchData }: { handleFetchData: () => void }) => {
  return (
    <div className="flex flex-col items-center h-dvh w-full">
      <h1>Contact</h1>
      <button onClick={handleFetchData}>Fetch Data</button>
    </div>
  );
};

export default ContactView;
