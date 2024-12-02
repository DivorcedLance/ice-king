"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { WeatherData } from "@/app/types/weather";
import { Thermometer, Droplets, ArrowUp, Gauge } from "lucide-react";

interface Props {
  data: WeatherData[];
}

export default function WeatherTable({ data }: Props) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const getTemperatureColor = (temp: number) => {
    if (temp >= 35) return "bg-red-600 text-white";
    if (temp >= 30) return "bg-red-400 text-white";
    if (temp >= 25) return "bg-orange-400 text-white";
    if (temp >= 20) return "bg-yellow-400 text-gray-800";
    if (temp >= 15) return "bg-blue-400 text-white";
    return "bg-blue-600 text-white";
  };

  const getHumidityColor = (humid: number) => {
    if (humid >= 80) return "bg-blue-600 text-white";
    if (humid >= 60) return "bg-blue-400 text-white";
    if (humid >= 40) return "bg-green-400 text-white";
    if (humid >= 20) return "bg-yellow-400 text-gray-800";
    return "bg-red-500 text-white";
  };

  const getPressureColor = (presion: number) => {
    if (presion >= 1025) return "bg-green-600 text-white";
    if (presion >= 1015) return "bg-green-400 text-white";
    if (presion >= 1005) return "bg-yellow-400 text-gray-800";
    return "bg-red-500 text-white";
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
        <Table className="min-w-full bg-white">
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Temperatura (°C)
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Presión (hPa)
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Altitud (m)
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Humedad (%)
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Fecha y Hora
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {getCurrentPageData().map((row, index) => (
              <TableRow
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 transition-colors`}
              >
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  <Badge
                    className={`${getTemperatureColor(
                      row.temperatura
                    )} flex items-center gap-2 px-2 py-1 rounded-md`}
                  >
                    <Thermometer size={16} />
                    {row.temperatura.toFixed(2)}
                  </Badge>
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  <Badge
                    className={`${getPressureColor(
                      row.presion
                    )} flex items-center gap-2 px-2 py-1 rounded-md`}
                  >
                    <Gauge size={16} />
                    {row.presion.toFixed(2)}
                  </Badge>
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  <Badge
                    variant="outline"
                    className="flex items-center gap-2 px-2 py-1 rounded-md border-gray-300"
                  >
                    <ArrowUp size={16} />
                    {row.altitud.toFixed(2)}
                  </Badge>
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  <Badge
                    className={`${getHumidityColor(
                      row.humedad
                    )} flex items-center gap-2 px-2 py-1 rounded-md`}
                  >
                    <Droplets size={16} />
                    {row.humedad.toFixed(2)}
                  </Badge>
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {row.created_at}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                className={`${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                } px-3 py-2 rounded-md transition-colors duration-200`}
              >
                Anterior
              </PaginationPrevious>
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => handlePageChange(page)}
                  isActive={currentPage === page}
                  className={`${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "bg-white text-blue-500 hover:bg-blue-100"
                  } px-3 py-2 rounded-md border border-blue-500 transition-colors duration-200`}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  handlePageChange(Math.min(totalPages, currentPage + 1))
                }
                className={`${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                } px-3 py-2 rounded-md transition-colors duration-200`}
              >
                Siguiente
              </PaginationNext>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
