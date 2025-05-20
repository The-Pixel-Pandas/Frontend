import React from "react";
import { useProfileStore } from "../../services";
import Dashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";

const DashboardBase = () => {
	const { isAdmin } = useProfileStore.getState();
	return <>{isAdmin ? <AdminDashboard /> : <Dashboard />}</>;
};

export default DashboardBase;
