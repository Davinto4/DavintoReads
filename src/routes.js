import AuthorProfile from './pages/AuthorProfile';
import EditProfile from './pages/EditProfile';

<Route path="/profile/:userId" element={<AuthorProfile />} />
<Route path="/edit-profile" element={<EditProfile />} />
