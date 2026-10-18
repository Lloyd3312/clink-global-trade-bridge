import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-md">
        <p className="text-xs text-primary uppercase mb-4">Clink Global Services</p>
        <h1 className="text-6xl font-semibold text-foreground mb-3">404</h1>
        <p className="text-lg text-muted-foreground mb-7">
          This page doesn't exist any more. The service you were looking for may
          have been moved or retired.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button variant="cta" asChild>
            <Link to="/">Return to Home</Link>
          </Button>
          <Button variant="cta-outline" asChild>
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
