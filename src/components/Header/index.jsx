const Logo = () => (
  <a
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 48,
      textDecoration: "none",
      color: "black",
    }}
    href="/"
  >
    <img
      style={{
        borderRadius: 12,
      }}
      width={50}
      height={50}
      src="/logo.png"
      alt="EventMobi Logo"
    />
    <h2
      style={{
        margin: "auto 12px auto 12px",
      }}
    >
      eventmobi Coding Challenge
    </h2>
  </a>
);

const Header = ({ onlyLogo }) => {
  if (onlyLogo) {
    return <Logo />;
  }

  return (
    <header>
      <Logo />
      <h3>
        Please use the search bar below to search the username and get all the
        gists of the user.
      </h3>
    </header>
  );
};

export default Header;
