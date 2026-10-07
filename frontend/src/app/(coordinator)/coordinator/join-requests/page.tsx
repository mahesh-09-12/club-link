"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  AlertCircle,
  RefreshCw,
  Search,
  Filter,
} from "lucide-react";
import { joinRequestService } from "@/services/joinRequestService";
import { clubService } from "@/services/clubService";
import { JoinRequest, Club } from "@/types";
import { Button } from "@/components/ui/button";

export default function CoordinatorJoinRequestsPage() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [selectedClubId, setSelectedClubId] = useState<number | null>(null);
  const [requests, setRequests] = useState<JoinRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingClubs, setLoadingClubs] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [processingId, setProcessingId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Fetch available clubs on initial load
  useEffect(() => {
    let isMounted = true;
    clubService
      .getClubs()
      .then((data) => {
        if (isMounted) {
          setClubs(data);
          if (data.length > 0) {
            setSelectedClubId(data[0].id);
          }
          setLoadingClubs(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error("Failed to load clubs list:", err);
          setLoadingClubs(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const fetchJoinRequests = useCallback(async () => {
    if (selectedClubId === null) return;
    setLoading(true);
    setError(null);
    try {
      const data = await joinRequestService.getClubJoinRequests(selectedClubId);
      setRequests(data);
    } catch (err: unknown) {
      console.error("Failed to fetch join requests:", err);
      if (typeof err === "object" && err !== null && "response" in err) {
        const status = (err as { response?: { status?: number } }).response?.status;
        if (status === 403) {
          setError("You are not authorized to manage requests for this club.");
        } else if (status === 404) {
          setError("The requested club was not found.");
        } else {
          setError("Failed to load join requests for this club.");
        }
      } else {
        setError("Unable to connect to the server. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  }, [selectedClubId]);

  useEffect(() => {
    if (selectedClubId !== null) {
      fetchJoinRequests();
    }
  }, [selectedClubId, fetchJoinRequests]);

  const handleUpdateStatus = async (
    requestId: number,
    newStatus: "approved" | "rejected"
  ) => {
    setProcessingId(requestId);
    try {
      const updatedReq = await joinRequestService.updateJoinRequestStatus(
        requestId,
        newStatus
      );
      setRequests((prev) =>
        prev.map((r) => (r.id === requestId ? updatedReq : r))
      );
    } catch (err: unknown) {
      console.error("Failed to update join request status:", err);
      if (typeof err === "object" && err !== null && "response" in err) {
        const resData = (err as { response?: { data?: { detail?: string } } }).response?.data;
        alert(resData?.detail || "Failed to update request status.");
      } else {
        alert("Unable to connect to the server.");
      }
    } finally {
      setProcessingId(null);
    }
  };

  const filteredRequests = requests.filter((req) => {
    if (statusFilter === "all") return true;
    return req.status.toLowerCase() === statusFilter.toLowerCase();
  });

  const selectedClub = clubs.find((c) => c.id === selectedClubId);

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Club Join Requests</h1>
        <p className="text-muted-foreground mt-1">
          Review and process membership applications for your assigned campus clubs.
        </p>
      </div>

      {/* Controls: Club Selector & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch">
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
            Select Club:
          </label>
          {loadingClubs ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" /> Loading clubs...
            </div>
          ) : clubs.length > 0 ? (
            <select
              value={selectedClubId ?? ""}
              onChange={(e) => setSelectedClubId(Number(e.target.value))}
              className="px-3 py-2 border border-border bg-card rounded-md text-sm outline-none focus:border-primary font-medium transition-colors cursor-pointer"
            >
              {clubs.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} (ID: {c.id})
                </option>
              ))}
            </select>
          ) : (
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Enter Club ID"
                value={selectedClubId ?? ""}
                onChange={(e) => setSelectedClubId(Number(e.target.value))}
                className="px-3 py-2 border border-border bg-card rounded-md text-sm outline-none focus:border-primary w-36"
              />
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Filter className="size-4 text-muted-foreground" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-border bg-card rounded-md text-sm outline-none focus:border-primary transition-colors cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending Only</option>
            <option value="approved">Approved Only</option>
            <option value="rejected">Rejected Only</option>
          </select>
        </div>
      </div>

      {/* Currently Selected Club Details Banner */}
      {selectedClub && (
        <div className="p-4 border border-border bg-card rounded-lg flex justify-between items-center text-sm">
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              Managing Requests For
            </span>
            <span className="font-bold text-base text-foreground">{selectedClub.name}</span>
            <span className="ml-3 text-xs text-muted-foreground">
              Category: {selectedClub.category}
            </span>
          </div>
          <Button onClick={fetchJoinRequests} variant="ghost" size="sm" className="gap-1 text-xs">
            <RefreshCw className="size-3.5" /> Refresh
          </Button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="size-8 animate-spin mb-3 text-primary" />
          <p className="text-sm">Fetching join requests...</p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="flex flex-col items-center justify-center py-16 px-4 border border-destructive/20 bg-destructive/5 rounded-lg text-center">
          <AlertCircle className="size-10 text-destructive mb-3" />
          <h3 className="text-lg font-semibold text-foreground">Access Restricted</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-md">{error}</p>
        </div>
      )}

      {/* Join Requests Table */}
      {!loading && !error && filteredRequests.length > 0 && (
        <div className="border border-border bg-card rounded-lg shadow-xs overflow-hidden">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/20 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <th className="p-4">Request ID</th>
                <th className="p-4">Student ID</th>
                <th className="p-4">Submitted Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredRequests.map((req) => {
                const dateStr = new Date(req.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                });
                const isProcessing = processingId === req.id;

                return (
                  <tr key={req.id} className="hover:bg-muted/10 transition-colors">
                    <td className="p-4 font-semibold text-foreground">#{req.id}</td>
                    <td className="p-4 text-foreground font-medium">Student #{req.student_id}</td>
                    <td className="p-4 text-muted-foreground text-xs">{dateStr}</td>
                    <td className="p-4">
                      {req.status === "pending" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                          <Clock className="size-3" /> Pending
                        </span>
                      )}
                      {req.status === "approved" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          <CheckCircle className="size-3" /> Approved
                        </span>
                      )}
                      {req.status === "rejected" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-destructive/10 text-destructive border border-destructive/20">
                          <XCircle className="size-3" /> Rejected
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      {req.status === "pending" ? (
                        <div className="flex justify-end gap-2">
                          <Button
                            size="xs"
                            variant="outline"
                            disabled={isProcessing}
                            onClick={() => handleUpdateStatus(req.id, "rejected")}
                            className="text-xs h-8 text-destructive border-destructive/20 hover:bg-destructive/10 hover:text-destructive gap-1"
                          >
                            {isProcessing ? (
                              <Loader2 className="size-3 animate-spin" />
                            ) : (
                              <XCircle className="size-3.5" />
                            )}
                            Reject
                          </Button>
                          <Button
                            size="xs"
                            disabled={isProcessing}
                            onClick={() => handleUpdateStatus(req.id, "approved")}
                            className="text-xs h-8 bg-emerald-600 hover:bg-emerald-700 text-white gap-1"
                          >
                            {isProcessing ? (
                              <Loader2 className="size-3 animate-spin" />
                            ) : (
                              <CheckCircle className="size-3.5" />
                            )}
                            Approve
                          </Button>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground font-medium capitalize">
                          Processed ({req.status})
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredRequests.length === 0 && (
        <div className="text-center py-16 border border-dashed border-border rounded-lg bg-card">
          <Users className="size-10 text-muted-foreground mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-foreground">No Join Requests Found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {requests.length === 0
              ? "There are currently no join requests submitted for this club."
              : "No join requests match your selected status filter."}
          </p>
        </div>
      )}
    </div>
  );
}
