import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { ListProduct } from "./components/ListProduct";
import { AddProductForm } from "./components/AddProductForm";
import "antd/dist/antd.css";
import "./App.css";
import ProductAPI from "./api/productAPI";
import { IProductItem } from "./components/interface";

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [products, setProducts] = useState<IProductItem[]>([]);
  const [currentProduct, setCurrentProduct] = useState<IProductItem | null>(null)

  useEffect(() => {
    ProductAPI.getAll()
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err))
      .then(() => {});
  }, []);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //
  const handleClose = () => {
    setIsModalVisible(false);
  }
  const handleAddItem = async (itemProduct: IProductItem) => {
    handleClose();
    try {
      await ProductAPI.addProduct(itemProduct);
      setProducts([...products, itemProduct]);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteProduct = async (id: string) => {
    try {
      await ProductAPI.deleteProduct(id);
      const list = products.filter(
        (product: IProductItem) => product.id !== id
      );
      setProducts(list);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditProduct = (itemProduct: IProductItem) => {
    // console.log(itemProduct);
    setCurrentProduct(itemProduct);
    setIsModalVisible(true);
  } 
  const handleUpdateProduct = async (itemProduct: IProductItem) => {
      const list = products.map((product) => {
          if(product.id === itemProduct.id) {
              return {
                  ...itemProduct
              }
          }
          return product;
      })
      handleClose();
      try {
        await ProductAPI.updateProduct(itemProduct.id, itemProduct);
            setProducts(list);
      } catch (error) {
        console.log(error);
      }

  } 
  return (
    <div className="App">
      <h2>List product</h2>
      <div className="header-add-user">
        <button className="ant-btn ant-btn-primary" onClick={handleOpenModal}>
          Add New Product
        </button>
      </div>
      <ListProduct list={products} deleteProduct={handleDeleteProduct} editProduct={handleEditProduct} />
      <Modal
        title="Add Product"
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <AddProductForm currentProduct={currentProduct} onAddProduct={handleAddItem} onEditProduct={handleUpdateProduct} onClose={handleClose} />
      </Modal>
    </div>
  );
}

export default App;
