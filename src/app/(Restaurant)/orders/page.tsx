"use client"
import React, { useEffect, useState } from 'react';
import apiServices from "@/services/api";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { ArrowUpDown } from 'lucide-react';

export default function Page() {
  const [delivery, setDelivery] = useState<any>([]);
  const [sortConfig, setSortConfig] = useState({ 
    key: 'order_date', 
    direction: 'descending' 
  });

  useEffect(() => {
    const fetchDeliveryOrders = async () => {
      try {
        const response = await apiServices.deliveryOrders("");
        setDelivery(response.data);
      } catch (error) {
        console.error("Failed to fetch delivery orders:", error);
      }
    };
    fetchDeliveryOrders();
  }, []);

  const sortedOrders = [...delivery].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key:any) => {
    let direction = 'descending';
    if (sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = 'ascending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <Card className="w-full max-w-6xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">
          Delivery Orders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort('order_date')}
              >
                <div className="flex items-center">
                  Order Date
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort('delivery_address')}
              >
                <div className="flex items-center">
                  Delivery Address
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-100 text-right"
                onClick={() => requestSort('total_price')}
              >
                <div className="flex items-center justify-end">
                  Total Price
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedOrders.map((order, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell className="font-medium">
                  {new Date(order.order_date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {order.delivery_address}
                </TableCell>
                <TableCell className="text-right">
                  ₹{order.total_price.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}