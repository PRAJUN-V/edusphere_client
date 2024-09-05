import React, { useState, useEffect } from 'react';
import { SideBar } from './common/SideBar';
import Header from './common/Header';
import api from '../../api';
import { Modal, Button, Input, Switch } from 'antd';
import 'antd/dist/reset.css'; // Import Ant Design styles

export const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [showAddSubCategory, setShowAddSubCategory] = useState(false);
    const [editCategory, setEditCategory] = useState(null);
    const [subCategoryEdit, setSubCategoryEdit] = useState(null);
    const [newCategory, setNewCategory] = useState({ name: '', description: '' });
    const [newSubCategory, setNewSubCategory] = useState({ name: '', description: '', category: null });
    const [currentCategoryId, setCurrentCategoryId] = useState(null);

    useEffect(() => {
        api.get('/admin_api/categories/')
            .then(response => {
                console.log(response.data);
                setCategories(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the categories!', error);
            });
    }, []);

    const handleAddCategory = () => {
        setNewCategory({ name: '', description: '' });
        setEditCategory(null);
        setShowAddCategory(true);
    };

    const handleEditCategory = (category) => {
        setEditCategory(category);
        setNewCategory({ name: category.name, description: category.description });
        setShowAddCategory(true);
    };

    const handleSaveCategory = () => {
        if (editCategory) {
            // Update category
            api.put(`/admin_api/categories/${editCategory.id}/`, newCategory)
                .then(response => {
                    setCategories(categories.map(cat => (cat.id === response.data.id ? response.data : cat)));
                    setEditCategory(null);
                })
                .catch(error => {
                    console.error('There was an error updating the category!', error);
                });
        } else {
            // Create new category
            api.post('/admin_api/categories/', newCategory)
                .then(response => {
                    setCategories([...categories, response.data]);
                })
                .catch(error => {
                    console.error('There was an error creating the category!', error);
                });
        }
        setShowAddCategory(false);
    };

    const handleToggleCategoryActive = (categoryId) => {
        const category = categories.find(cat => cat.id === categoryId);
        api.patch(`/admin_api/categories/${categoryId}/`, { active: !category.active })
            .then(response => {
                setCategories(categories.map(cat => (cat.id === response.data.id ? response.data : cat)));
            })
            .catch(error => {
                console.error('There was an error toggling category active status!', error);
            });
    };

    const handleToggleSubCategoryActive = (subCategoryId) => {
        const category = categories.find(cat => cat.subcategories.some(sub => sub.id === subCategoryId));
        const subCategory = category.subcategories.find(sub => sub.id === subCategoryId);
        api.patch(`/admin_api/subcategories/${subCategoryId}/`, { active: !subCategory.active })
            .then(response => {
                setCategories(categories.map(cat => ({
                    ...cat,
                    subcategories: cat.subcategories.map(sub => (sub.id === response.data.id ? response.data : sub))
                })));
            })
            .catch(error => {
                console.error('There was an error toggling subcategory active status!', error);
            });
    };

    const handleEditSubCategory = (subCategory) => {
        setSubCategoryEdit(subCategory);
    };

    const handleSaveSubCategory = () => {
        if (subCategoryEdit) {
            api.put(`/admin_api/subcategories/${subCategoryEdit.id}/`, subCategoryEdit)
                .then(response => {
                    setCategories(categories.map(cat => ({
                        ...cat,
                        subcategories: cat.subcategories.map(sub => (sub.id === response.data.id ? response.data : sub))
                    })));
                    setSubCategoryEdit(null);
                })
                .catch(error => {
                    console.error('There was an error updating the subcategory!', error);
                });
        }
    };

    const handleAddSubCategory = (categoryId) => {
        setCurrentCategoryId(categoryId);
        setNewSubCategory({ name: '', description: '', category: categoryId });
        setShowAddSubCategory(true);
    };

    const handleSaveSubCategoryToCategory = () => {
        if (currentCategoryId) {
            api.post(`/admin_api/categories/${currentCategoryId}/add_subcategory/`, newSubCategory)
                .then(response => {
                    setCategories(categories.map(cat => (
                        cat.id === currentCategoryId
                            ? { ...cat, subcategories: [...cat.subcategories, response.data] }
                            : cat
                    )));
                    setShowAddSubCategory(false);
                })
                .catch(error => {
                    console.error('There was an error creating the subcategory!', error);
                });
        }
    };

    return (
        <div className="flex min-h-screen">
            <SideBar />
            <div className="flex-grow flex flex-col">
                <Header />
                <div className="p-6 flex-grow">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">Category List</h2>
                        <Button type="primary" onClick={handleAddCategory}>Add Category</Button>
                    </div>
                    <ul className="space-y-4">
                        {categories.map(category => (
                            <li key={category.id} className="bg-white p-4 rounded shadow">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-xl font-semibold">{category.name}</h3>
                                        <p className="text-gray-700">{category.description}</p>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <Button onClick={() => handleEditCategory(category)}>Edit</Button>
                                        <Button onClick={() => handleAddSubCategory(category.id)}>Add Subcategory</Button>
                                        <Switch
                                            checked={category.active}
                                            onChange={() => handleToggleCategoryActive(category.id)}
                                        />
                                    </div>
                                </div>
                                <ul className="pl-6 list-disc">
                                    {category.subcategories.map(sub => (
                                        <li key={sub.id} className="mt-2">
                                            <div className="flex justify-between items-center">
                                                <span>{sub.name}</span>
                                                <div className="flex items-center space-x-4">
                                                    <Button onClick={() => handleEditSubCategory(sub)}>Edit Subcategory</Button>
                                                    <Switch
                                                        checked={sub.active}
                                                        onChange={() => handleToggleSubCategoryActive(sub.id)}
                                                    />
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Add/Edit Category Modal */}
            <Modal
                title={editCategory ? 'Edit Category' : 'Add Category'}
                visible={showAddCategory}
                onCancel={() => setShowAddCategory(false)}
                onOk={handleSaveCategory}
            >
                <Input
                    placeholder="Category Name"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                />
                <Input.TextArea
                    placeholder="Category Description"
                    value={newCategory.description}
                    onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                />
            </Modal>

            {/* Edit Subcategory Modal */}
            <Modal
                title="Edit Subcategory"
                visible={!!subCategoryEdit}
                onCancel={() => setSubCategoryEdit(null)}
                onOk={handleSaveSubCategory}
            >
                <Input
                    placeholder="Subcategory Name"
                    value={subCategoryEdit ? subCategoryEdit.name : ''}
                    onChange={(e) => setSubCategoryEdit(prev => ({ ...prev, name: e.target.value }))}
                />
                <Input.TextArea
                    placeholder="Subcategory Description"
                    value={subCategoryEdit ? subCategoryEdit.description : ''}
                    onChange={(e) => setSubCategoryEdit(prev => ({ ...prev, description: e.target.value }))}
                />
            </Modal>

            {/* Add Subcategory Modal */}
            <Modal
                title="Add Subcategory"
                visible={showAddSubCategory}
                onCancel={() => setShowAddSubCategory(false)}
                onOk={handleSaveSubCategoryToCategory}
            >
                <Input
                    placeholder="Subcategory Name"
                    value={newSubCategory.name}
                    onChange={(e) => setNewSubCategory(prev => ({ ...prev, name: e.target.value }))}
                />
                <Input.TextArea
                    placeholder="Subcategory Description"
                    value={newSubCategory.description}
                    onChange={(e) => setNewSubCategory(prev => ({ ...prev, description: e.target.value }))}
                />
            </Modal>
        </div>
    );
};
