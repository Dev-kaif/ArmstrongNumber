/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axiosInstance";

interface ArmstrongNumber {
  id: string;
  number: number;
  createdAt: string;
  user?: {
    email: string;
    name: string;
  };
}

interface HistoryProps {
  refresh: boolean;
}

function History({ refresh }: HistoryProps) {
  const [history, setHistory] = useState<ArmstrongNumber[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewGlobal, setViewGlobal] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalPages, setTotalPages] = useState(1);

  const fetchUserHistory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/armStrong/number?page=${page}&limit=${limit}`
      );
      const { armstrongNumbers, totalPages } = response.data;
      setTotalPages(totalPages);
      setHistory(armstrongNumbers);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch your history.");
    } finally {
      setLoading(false);
    }
  };

  const fetchGlobalHistory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/global/allUserData?page=${page}&limit=${limit}`);
      const armstrongNumbers = response.data.armstrongNumbers ?? [];
      const totalPages = response.data.totalPages ?? 1;

      setTotalPages(totalPages);

      const data = armstrongNumbers.map((item: any) => ({
        id: item.id,
        number: item.number,
        createdAt: item.createdAt,
        user: {
          email: item.user?.email ?? "N/A",
          name: item.user?.name ?? "N/A",
        },
      }));

      setHistory(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch global history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (viewGlobal) {
      fetchGlobalHistory();
    } else {
      fetchUserHistory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewGlobal, page, refresh]);

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  return (
    <div className="w-full max-w-2xl space-y-4">
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => {
            setViewGlobal((prev) => !prev);
            setPage(1);
          }}
        >
          {viewGlobal ? "View My History" : "View Global History"}
        </Button>
        {totalPages > 1 && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevPage}
              disabled={page === 1}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground self-center">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {viewGlobal ? "Global Armstrong History" : "Your Armstrong History"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          ) : history.length === 0 ? (
            <p className="text-center text-muted-foreground">
              {viewGlobal
                ? "No Armstrong numbers verified globally yet."
                : "You have not verified any Armstrong numbers yet."}
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Sr. no.</TableHead>
                  <TableHead>Number</TableHead>
                  <TableHead>Date Verified</TableHead>
                  {viewGlobal && <TableHead>User Email</TableHead>}
                  {viewGlobal && <TableHead>User Name</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((item, idx) => (
                  <TableRow key={item.id}>
                    <TableCell>{(page - 1) * limit + idx + 1}</TableCell>
                    <TableCell>{item.number}</TableCell>
                    <TableCell>
                      {new Date(item.createdAt).toLocaleString()}
                    </TableCell>
                    {viewGlobal && (
                      <>
                        <TableCell className="text-xs text-muted-foreground">
                          {item.user?.email ?? "N/A"}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {item.user?.name ?? "N/A"}
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default History;
