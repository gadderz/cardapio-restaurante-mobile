import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { ProductController } from "../../../controllers/ProductController";
import { Product } from "../../../models/Product";

export const MenuScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await ProductController.getAll();
      setProducts(data);
    };
    loadProducts();
  }, []);

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View>
          <Image source={{ uri: item.image }} style={{ width: 50, height: 50 }} />
          <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
          <Text>{item.description}</Text>
          <Text>R$ {item.price.toFixed(2)}</Text>
        </View>
      )}
    />
  );
};