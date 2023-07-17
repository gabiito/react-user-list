const Footer: React.FC = () => {
  return (
    <div className="px-4 md:px-10 max-w-7xl mx-auto mt-10">
      <p className="text-center text-gray-500 text-sm py-5">
        Created by{" "}
        <a
          href="https://github.com/gabiito"
          target="_blank"
          rel="noreferrer"
          className="text-indigo-500 hover:text-indigo-600"
        >
          Gabriel
        </a>{" "}
        - Using{" "}
        <a
          href="https://randomuser.me/"
          target="_blank"
          rel="noreferrer"
          className="text-indigo-500 hover:text-indigo-600"
        >
          Random User API
        </a>
      </p>
    </div>
  );
};

export default Footer;
