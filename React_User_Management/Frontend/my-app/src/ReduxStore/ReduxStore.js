// ... (previous imports)

const Navbar = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => {
    return state.user.username;
  });
  const [isSuper, setisSuper] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const refresh_tokens = localStorage.getItem("refresh_token");

  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setIsAuth(true);
      const isSuperFromStorage = localStorage.getItem("is_super") === "true";
      setisSuper(isSuperFromStorage);
    }
  }, []);

  const logoutHandle = async () => {
    try {
      const requestData = {
        refresh_token: refresh_tokens,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/api/logout",
        requestData,
        config
      );

      if (response.status === 205) {
        axios.defaults.headers.common["Authorization"] = null;
        window.location.href = "/login";
        dispatch(logout());
      } else {
        console.log("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-white font-bold text-xl">
          My Website
        </Link>

        <div className="block lg:hidden">
          <button
            onClick={() => setIsAuth(!isAuth)}
            className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300"
          >
            <svg
              className="h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>

        <div className="lg:flex lg:justify-center lg:items-center space-x-4">
          <Link
            to="/"
            className="text-white hover:text-gray-300 px-4 py-2 block lg:inline-block"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-white hover:text-gray-300 px-4 py-2 block lg:inline-block"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-white hover:text-gray-300 px-4 py-2 block lg:inline-block"
          >
            Contact
          </Link>

          {isAuth && (
            <>
              {isSuper && (
                <Link
                  to="/admin"
                  className="text-white hover:text-gray-300 px-4 py-2 block lg:inline-block"
                >
                  Admin
                </Link>
              )}
              <Link
                to="/profile"
                className="text-white hover:text-gray-300 px-4 py-2 block lg:inline-block"
              >
                Profile
              </Link>
              <span className="text-gray-900">{username}</span>
              <button
                onClick={logoutHandle}
                className="inline-flex items-center bg-yellow-500 border-0 py-1 px-3 mt-4 md:mt-0 rounded-md text-white hover:bg-yellow-600 focus:outline-none focus:ring focus:border-yellow-700"
              >
                Logout
              </button>
            </>
          )}

          {!isAuth && (
            <>
              <Link
                to="/register"
                className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md block lg:inline-block"
              >
                Sign up
              </Link>
              <Link
                to="/login"
                className="bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-md block lg:inline-block"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
