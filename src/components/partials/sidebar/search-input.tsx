import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SearchInput = () => {
  return (
    <div className="p-2">
      {/* Full search input - hidden when collapsed */}
      <div className="relative flex w-full items-center group-data-[collapsible=icon]:hidden">
        <Search className="text-muted-foreground absolute left-3 h-4 w-4" />
        <Input
          type="search"
          placeholder="Search..."
          className="placeholder:text-muted-foreground w-full pl-9"
        />
      </div>

      {/* Icon only - shown when collapsed */}
      <Button
        size="icon"
        variant="outline"
        className="bg-muted hidden group-data-[collapsible=icon]:flex"
      >
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SearchInput;
