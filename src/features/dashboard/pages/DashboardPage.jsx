import PageHeader from "../../../components/ui/PageHeader";

import WelcomeBanner from "../components/WelcomeBanner";
import DashboardCards from "../components/DashboardCards";
import QuickActions from "../components/QuickActions";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Welcome to Mr. Prompt Studio - Enterprise Prompt Engineering Platform"
      />

      <WelcomeBanner />

      <DashboardCards />

      <QuickActions />
    </div>
  );
}