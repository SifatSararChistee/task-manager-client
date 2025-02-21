const Footer = () => {
  return (
    <footer className="text-center text-black p-4 mt-10">
      <div className="container mx-auto">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} TaskManagerApp. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          Made with 💻 by Sifat Sarar Chistee
        </p>
      </div>
    </footer>
  );
};

export default Footer;
