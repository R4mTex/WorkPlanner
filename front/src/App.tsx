import "./App.css";

import { Routes, Route, useLocation } from "react-router";
import { ToastContainer } from "react-toastify";

import BackNavigate from "./components/ui/BackNavigate";
import Navbar from "./layout/Navbar";

import AccountEdit from "./pages/AuthParameters/AccountEdit";
import AccountParams from "./pages/AuthParameters/AccountParams";

import ForgotPassword from "./pages/Auth/ForgotPassword";
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";

import Notifications from "./pages/Notifications/Notifications";

import Home from "./pages/Home";

import IntervenantsList from "./pages/Intervenants/IntervenantsList";

import IncidentAdd from "./pages/Incidents/IncidentAdd";
import IncidentDetails from "./pages/Incidents/IncidentDetails";
import IncidentEdit from "./pages/Incidents/IncidentEdit";
// import IncidentList from './pages/Incidents/IncidentList';

import NotFound from "./pages/NotFound";

import Planning from "./pages/Planning/Planning";
import PlanningDetails from "./pages/Planning/PlanningDetails";

import PurchaseAdd from "./pages/Purchase/PurchaseAdd";
import PurchaseDetails from "./pages/Purchase/PurchaseDetails";
import PurchaseEdit from "./pages/Purchase/PurchaseEdit";
import PurchaseList from "./pages/Purchase/PurchaseList";

import TaskAdd from "./pages/Tasks/TaskAdd";
import TaskDetails from "./pages/Tasks/TaskDetails";
import TaskEdit from "./pages/Tasks/TaskEdit";

import WorksiteCreate from "./pages/Worksites/WorksiteCreate";
import WorksiteDetails from "./pages/Worksites/WorksiteDetails";
import WorksiteEdit from "./pages/Worksites/WorksiteEdit";

/* import StoreTest from "./pages/StoreEntrainementV1"; */

export default function App() {
	const location = useLocation();

	return (
		<>
			{location.pathname !== "/" && <BackNavigate />}
			<Routes>
				<Route index path="/" element={<Home />} />
				{/* Achat */}
				<Route path="/achat" element={<PurchaseList />} />
				<Route path="/achat/add" element={<PurchaseAdd />} />
				<Route path="/achat/:id" element={<PurchaseDetails />} />
				<Route path="/achat/:id/edit" element={<PurchaseEdit />} />
				{/* Achat */}
				{/* paramètres utilisateurs */}
				<Route path="/account/edit" element={<AccountEdit />} />
				<Route path="/account/:id/params" element={<AccountParams />} />
				{/* paramètres utilisateurs */}
				{/* connexion */}
				<Route path="/forgotpassword" element={<ForgotPassword />} />
				<Route path="/signin" element={<Signin />} />
				<Route path="/signup" element={<Signup />} />
				{/* connexion */}
				{/* notifications */}
				<Route path="/notifications" element={<Notifications />} />
				{/* notifications */}
				{/* Incident */}
				<Route path="/incident/ajout" element={<IncidentAdd />} />
				<Route path="/incident/edition/:id" element={<IncidentEdit />} />
				<Route path="/incident/:id" element={<IncidentDetails />} />
				{/* <Route path="/tache/:id/incident" element={<IncidentList />} /> */}
				{/* Incident */}
				{/* Intervenants */}
				<Route path="/mesIntervenants" element={<IntervenantsList />} />
				{/* <Route path="/intervenants/edition/:id" element={<IntervenantEdit />} /> */}
				{/* Intervenants */}
				{/* Not found */}
				<Route path="*" element={<NotFound />} />
				{/* planning */}
				<Route path="/planning/:id" element={<Planning />} />
				<Route path="/planning/:id/:dateparams" element={<PlanningDetails />} />
				<Route path="/planning/tache/:id" element={<TaskDetails />} />
				{/* planning */}
				{/* task */}
				<Route path="/tache/ajout/:id" element={<TaskAdd />} />
				<Route path="/tache/edition/" element={<TaskEdit />} />
				{/* task */}
				{/* Chantier en détails */}
				<Route path="/worksite/create" element={<WorksiteCreate />} />
				<Route path="/worksite/:id/details/" element={<WorksiteDetails />} />
				<Route path="/worksite/:id/modification/" element={<WorksiteEdit />} />
				{/* Chantier en détails */}
				{/* <Route path="/store" element={<StoreTest />} /> */}
			</Routes>
			<Navbar />
			<ToastContainer
				position="bottom-right"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
		</>
	);
}
