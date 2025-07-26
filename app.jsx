import ProfilePage from './pages/ProfilePage';

<Route path="/profile" element={<ProfilePage />} />
import AuthorProfile from "./pages/AuthorProfile";
import EditProfile from "./pages/EditProfile";

<Route path="/author/:authorId" element={<AuthorProfile />} />
<Route path="/edit-profile" element={<EditProfile />} />
