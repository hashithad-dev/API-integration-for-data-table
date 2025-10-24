"use client"

import React, { useEffect, useState } from "react"
import { columns, User } from "./columns"
import { DataTable } from "../datatable/data-table"

async function getData(): Promise<User[]> {
  try {
    const response = await fetch("https://dummyjson.com/users?limit=200")
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

    const json = await response.json()

    // Map API response to our User type
    const users: User[] = json.users.map((u: any) => ({
      id: u.id,
      firstName: u.firstName,
      lastName: u.lastName,
      age: u.age,
      gender: u.gender,
      email: u.email,
      phone: u.phone,
    }))

    return users
  } catch (error) {
    console.error("Error fetching users:", error)
    return []
  }
}

export default function UsersPage() {
  const [data, setData] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getData()
      .then((users) => {
        setData(users)
        setLoading(false)
      })
      .catch((err) => {
        setError("Failed to load user data.")
        console.error(err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold">
        Loading user data...
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 font-semibold">
        {error}
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">API Data - Users</h1>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
