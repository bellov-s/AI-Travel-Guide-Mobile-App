// sidebar.tsx (фрагменты с правками)
// cookie
useEffect(() => {
  document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
}, [openState]);

// keydown listener
useEffect(() => {
  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, []);

// random percent
const [randomPercent, setRandomPercent] = useState("50%");
useEffect(() => {
  setRandomPercent(`${Math.floor(Math.random() * 40) + 50}%`);
}, []);
return randomPercent;
