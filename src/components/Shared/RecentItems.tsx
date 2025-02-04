import { SquareCheck } from "lucide-react";
import { Link } from "react-router";

interface RecentItem {
  id: string;
  name: string;
  status: "new" | "updated";
}

interface RecentItemsProps {
  items: RecentItem[];
}
const RecentItems = ({ items }: RecentItemsProps) => {
  return (
    <>
      <details open>
        <summary>Recent items</summary>
        {items.map(({ name, id, status }: RecentItem) => (
          <div key={id} className="flex items-center justify-between">
            <div className="flex gap-1 items-center text-sm text-blue-500">
              <SquareCheck className="" size={20} />
              {name}
              {status === "new"
                ? " added successfully"
                : " updated successfully"}
            </div>
            <Link
              to={`/product/${id}`}
              className="flex gap-1 text-blue-500 text-sm items-center"
            >
              view
            </Link>
          </div>
        ))}
      </details>
    </>
  );
};

export default RecentItems;
<details>
  <summary>Click to Expand</summary>
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ul>
</details>;
