"use client";

import { adminAuth } from "@/actions/database";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, Loader, Loader2, X } from "lucide-react";
import { redirect } from "next/navigation";
import React, { useState } from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <main className="flex-1 wrapper flex flex-col">
      <span className="h-[5rem] flex items-center">
        <Logo />
      </span>
      {!isAdmin ? <AuthAdmin setIsAdmin={setIsAdmin} /> : children}
    </main>
  );
};

const AuthAdmin = ({
  setIsAdmin,
}: {
  setIsAdmin: (isAdmin: boolean) => void;
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setError("");

    if (!username || !password) {
      setError("Password or username can't be empty.");
      return;
    }

    setIsLoading(true);
    adminAuth(username, password)
      .then((data) => {
        if (data) {
          setIsAdmin(true);
        } else {
          setError("Invalid username and password.");
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="flex flex-col gap-2 w-full max-w-md mx-auto my-auto">
      <p className="h3">Admin login</p>
      <p className="flex items-center gap-2">
        <AlertCircle className="size-4 inline text-yellow-600" /> Only admin
        users are allowed in this place
      </p>
      <Input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
      />
      <Input
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      {error && (
        <p className="flex items-center gap-2 text-sm">
          <X className="size-4 inline text-red-600" /> {error}
        </p>
      )}
      <Button disabled={isLoading} onClick={handleLogin}>
        {isLoading && <Loader2 className="size-4 mr-2 inline" />}Login
      </Button>
    </div>
  );
};
export default AdminLayout;
