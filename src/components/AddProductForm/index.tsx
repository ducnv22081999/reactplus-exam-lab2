import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { IProductItem } from "../interface";

interface AddProductFormProps {
  currentProduct: IProductItem | null;
  onAddProduct: (itemProduct: IProductItem) => void;
  onEditProduct: (itemProduct: IProductItem) => void;
  onClose: () => void;
}

export const AddProductForm: React.FC<AddProductFormProps> = ({
  currentProduct,
  onAddProduct,
  onEditProduct,
  onClose,
}) => {
  const [inputAvatar, setInputAvatar] = useState(currentProduct?.avatar || "");
  const [inputName, setInputName] = useState(currentProduct?.name || "");
  const [inputContent, setInputContent] = useState(
    currentProduct?.content || ""
  );

  const handleSubmit = () => {
    if (currentProduct && onEditProduct) {
      onEditProduct({
        id: currentProduct.id,
        name: inputName,
        content: inputContent,
        avatar: inputAvatar,
      }); // send data to App
    } else if (onAddProduct) {
      onAddProduct({
        id: uuidv4(),
        name: inputName,
        content: inputContent,
        avatar: inputAvatar,
      });
    }
  };

  return (
    <div>
      <div className="field-input-group">
        <input
          placeholder="Image"
          type="text"
          className="ant-input"
          value={inputAvatar}
          onChange={(e) => setInputAvatar(e.target.value)}
        />
      </div>
      <div className="field-input-group">
        <input
          placeholder="Product name"
          type="text"
          className="ant-input"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />
      </div>
      <div className="field-input-group">
        <input
          placeholder="Product description"
          type="text"
          className="ant-input"
          value={inputContent}
          onChange={(e) => setInputContent(e.target.value)}
        />
      </div>
      <div className="modal-new-user-footer">
        <button className="ant-btn ant-btn-primary" onClick={handleSubmit}>
          Save
        </button>
        <button
          className="ant-btn"
          style={{ marginLeft: 10 }}
          onClick={() => onClose()}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
