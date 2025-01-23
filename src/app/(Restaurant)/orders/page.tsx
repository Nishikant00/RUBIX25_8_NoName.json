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
import { ArrowUpDown, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DeliveryOrdersPage() {
  const [delivery, setDelivery] = useState([]);
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
        // Consider adding user-friendly error handling, 
        // such as a toast notification or error state
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

  const requestSort = (key: string) => {
    let direction = 'descending';
    if (sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = 'ascending';
    }
    setSortConfig({ key, direction });
  };

  const handleTakeOrder = (orderId: string) => {
        // iDHR LOGIV AYEGA
    console.log(`Taking order: ${orderId}`);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Delivery Orders</CardTitle>
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
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort('total_price')}
              >
                <div className="flex items-center">
                  Total Price 
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedOrders.map((order:any, index) => (
              <TableRow key={order.id || index}>
                <TableCell>
                  {new Date(order.order_date).toLocaleDateString()}
                </TableCell>
                <TableCell>{order.delivery_address}</TableCell>
                <TableCell>₹{order.total_price.toLocaleString()}</TableCell>
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleTakeOrder(order.id)}
                  >
                    <Truck className="mr-2 h-4 w-4" /> Take Order
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}