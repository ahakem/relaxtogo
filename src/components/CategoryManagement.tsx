import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Link,
} from '@mui/material';
import * as MuiIcons from '@mui/icons-material';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, writeBatch } from 'firebase/firestore';
import { db } from '../config/firebase';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';

interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  order: number;
}

// Available icons for selection
const availableIcons = [
  { name: 'FitnessCenter', component: MuiIcons.FitnessCenter, label: 'Fitness' },
  { name: 'SelfImprovement', component: MuiIcons.SelfImprovement, label: 'Meditation' },
  { name: 'DirectionsRun', component: MuiIcons.DirectionsRun, label: 'Running' },
  { name: 'Psychology', component: MuiIcons.Psychology, label: 'Mind' },
  { name: 'Healing', component: MuiIcons.Healing, label: 'Healing' },
  { name: 'Spa', component: MuiIcons.Spa, label: 'Spa' },
  { name: 'FavoriteBorder', component: MuiIcons.FavoriteBorder, label: 'Heart' },
  { name: 'LocalFlorist', component: MuiIcons.LocalFlorist, label: 'Flower' },
  { name: 'WbSunny', component: MuiIcons.WbSunny, label: 'Sun' },
  { name: 'Nightlight', component: MuiIcons.Nightlight, label: 'Moon' },
];

const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#4CAF50',
    icon: 'FitnessCenter',
  });

  // Load categories from Firestore
  const loadCategories = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'categories'));
      const loadedCategories = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Category));
      // Sort by order field
      loadedCategories.sort((a, b) => (a.order || 0) - (b.order || 0));
      setCategories(loadedCategories);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load categories' });
      console.error('Error loading categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleOpenDialog = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      description: '',
      color: '#4CAF50',
      icon: 'FitnessCenter',
    });
    setDialogOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      color: category.color,
      icon: category.icon,
    });
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSaveCategory = async () => {
    try {
      if (editingCategory) {
        // Update existing category
        await updateDoc(doc(db, 'categories', editingCategory.id), {
          name: formData.name,
          description: formData.description,
          color: formData.color,
          icon: formData.icon,
        });
        setMessage({ type: 'success', text: 'Category updated successfully!' });
      } else {
        // Create new category with order at the end
        const maxOrder = categories.length > 0 ? Math.max(...categories.map(c => c.order || 0)) : -1;
        await addDoc(collection(db, 'categories'), {
          name: formData.name,
          description: formData.description,
          color: formData.color,
          icon: formData.icon,
          order: maxOrder + 1,
        });
        setMessage({ type: 'success', text: 'Category created successfully!' });
      }
      
      handleCloseDialog();
      loadCategories();
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to save category' });
      console.error('Error saving category:', error);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteDoc(doc(db, 'categories', categoryId));
        setMessage({ type: 'success', text: 'Category deleted successfully!' });
        loadCategories();
      } catch (error) {
        setMessage({ type: 'error', text: 'Failed to delete category' });
        console.error('Error deleting category:', error);
      }
    }
  };

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    
    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;
    
    if (sourceIndex === destIndex) return;
    
    try {
      const batch = writeBatch(db);
      const reorderedCategories = Array.from(categories);
      const [removed] = reorderedCategories.splice(sourceIndex, 1);
      reorderedCategories.splice(destIndex, 0, removed);
      
      // Update order for all affected categories
      reorderedCategories.forEach((category, index) => {
        batch.update(doc(db, 'categories', category.id), { order: index });
      });
      
      await batch.commit();
      setCategories(reorderedCategories);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to reorder categories' });
      console.error('Error reordering:', error);
    }
  };

  const getIconComponent = (iconName: string) => {
    // Try to get icon from MuiIcons
    const IconComponent = (MuiIcons as any)[iconName];
    return IconComponent || MuiIcons.FitnessCenter;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <MuiIcons.LocalFlorist sx={{ fontSize: 40, color: 'primary.main' }} />
          <Typography variant="h4" fontWeight={600}>
            Category Management
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<MuiIcons.Add />}
          onClick={handleOpenDialog}
          size="large"
        >
          Add Category
        </Button>
      </Box>

      {message && (
        <Alert severity={message.type} onClose={() => setMessage(null)} sx={{ mb: 3 }}>
          {message.text}
        </Alert>
      )}

      <Paper elevation={2}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="categories">
            {(provided) => (
              <List {...provided.droppableProps} ref={provided.innerRef}>
                {categories.length === 0 ? (
                  <ListItem>
                    <ListItemText 
                      primary="No categories yet" 
                      secondary="Click 'Add Category' to create your first category"
                    />
                  </ListItem>
                ) : (
                  categories.map((category, index) => {
                    const IconComponent = getIconComponent(category.icon);
                    return (
                      <Draggable key={category.id} draggableId={category.id} index={index}>
                        {(provided, snapshot) => (
                          <ListItem
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            sx={{
                              backgroundColor: snapshot.isDragging ? 'action.hover' : 'inherit',
                            }}
                            secondaryAction={
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                <IconButton edge="end" onClick={() => handleEditCategory(category)}>
                                  <MuiIcons.Edit />
                                </IconButton>
                                <IconButton edge="end" onClick={() => handleDeleteCategory(category.id)}>
                                  <MuiIcons.Delete />
                                </IconButton>
                              </Box>
                            }
                          >
                            <Box
                              {...provided.dragHandleProps}
                              sx={{ display: 'flex', alignItems: 'center', mr: 2, cursor: 'grab' }}
                            >
                              <MuiIcons.DragIndicator sx={{ color: 'action.active' }} />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                              <Box
                                sx={{
                                  width: 48,
                                  height: 48,
                                  borderRadius: 2,
                                  backgroundColor: category.color,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <IconComponent sx={{ color: 'white', fontSize: 28 }} />
                              </Box>
                              <ListItemText
                                primary={
                                  <Typography variant="body1" fontWeight={600}>{category.name}</Typography>
                                }
                                secondary={category.description}
                              />
                            </Box>
                          </ListItem>
                        )}
                      </Draggable>
                    );
                  })
                )}
                {provided.placeholder}
              </List>
            )}
          </Droppable>
        </DragDropContext>
      </Paper>

      {/* Add/Edit Category Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingCategory ? 'Edit Category' : 'Add New Category'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Name"
              type="text"
              fullWidth
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <TextField
              label="Description"
              type="text"
              fullWidth
              multiline
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <TextField
              label="Color"
              type="color"
              fullWidth
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              helperText="Pick a color for the category"
            />
            
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle2">
                  Icon Name
                </Typography>
                <Link 
                  href="https://mui.com/material-ui/material-icons/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  variant="caption"
                >
                  Browse Icons
                </Link>
              </Box>
              <TextField
                label="Material UI Icon Name"
                fullWidth
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                helperText="e.g., FitnessCenter, Spa, LocalFlorist"
                placeholder="FitnessCenter"
              />
              {formData.icon && (() => {
                const PreviewIcon = getIconComponent(formData.icon);
                return (
                  <Box sx={{ mt: 2, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1, textAlign: 'center' }}>
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
                      Preview:
                    </Typography>
                    <PreviewIcon sx={{ fontSize: 48, color: formData.color }} />
                  </Box>
                );
              })()}
            </Box>
            
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Quick Select Icons
              </Typography>
              <Grid container spacing={1}>
                {availableIcons.map((icon) => {
                  const IconComp = icon.component;
                  const isSelected = formData.icon === icon.name;
                  return (
                    <Grid item xs={4} sm={2.4} key={icon.name}>
                      <Card
                        sx={{
                          cursor: 'pointer',
                          border: isSelected ? '2px solid' : '1px solid',
                          borderColor: isSelected ? 'primary.main' : 'divider',
                          backgroundColor: isSelected ? 'action.selected' : 'background.paper',
                          '&:hover': {
                            backgroundColor: 'action.hover',
                          },
                        }}
                        onClick={() => setFormData({ ...formData, icon: icon.name })}
                      >
                        <CardContent sx={{ textAlign: 'center', p: 1.5, '&:last-child': { pb: 1.5 } }}>
                          <IconComp sx={{ fontSize: 32, color: formData.color }} />
                          <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                            {icon.label}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveCategory} variant="contained">
            {editingCategory ? 'Update Category' : 'Create Category'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CategoryManagement;
