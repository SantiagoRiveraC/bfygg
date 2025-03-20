"use client";

import { Card, CardContent, CardMedia, Typography, Button, IconButton } from "@mui/material";
import { Heart, ShoppingCart } from "@phosphor-icons/react";

export default function ProductCard() {
  return (
    <Card className="max-w-sm bg-white shadow-lg rounded-2xl overflow-hidden transition-transform hover:scale-105 mx-auto">
      {/* Product Image */}
      <CardMedia
        component="img"
        height="100"
        image="https://images.pexels.com/photos/939331/pexels-photo-939331.jpeg?auto=compress&cs=tinysrgb&w=600" // Replace with actual product image
        alt="Product Image"
        className="object-cover"
      />

      <CardContent className="p-4">
        {/* Title & Price */}
        <div className="flex justify-between items-center mb-2">
          <Typography variant="h6" className="font-bold text-gray-900">
            Awesome Product
          </Typography>
          <Typography variant="h6" className="text-blue-600 font-semibold">
            $99.99
          </Typography>
        </div>

        {/* Description */}
        <Typography variant="body2" className="text-gray-600 mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae libero, aperiam ullam dolor aliquam commodi laborum culpa voluptas error animi unde fugit blanditiis tempore sit quod tenetur enim vitae, ab dolore ea ad laboriosam labore molestiae! Dolores, corporis! Cum, deleniti.
        </Typography>

        {/* Buttons */}
        <div className="flex justify-between items-center">
          {/* Favorite Button */}
          <IconButton className="text-red-500 hover:text-red-600">
            <Heart size={24} weight="bold" />
          </IconButton>

          {/* Buy Button */}
          <Button
            variant="contained"
            color="primary"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            startIcon={<ShoppingCart size={20} />}
          >
            Buy Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
