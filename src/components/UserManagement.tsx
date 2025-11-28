import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
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
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  Drawer,
  ListItemIcon,
  Divider,
  Avatar,
} from '@mui/material';
import { Delete, Add, People, VideoLibrary, Home, Logout, Settings, Edit, Category, Block } from '@mui/icons-material';
import { collection, deleteDoc, doc, getDocs, setDoc, getDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { logout } from '../config/passwords';
import { useNavigate } from 'react-router-dom';
import AdminPanel from './AdminPanel';
import CategoryManagement from './CategoryManagement';
import SiteSettings from './SiteSettings';
import Header from './Header';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  suspended: boolean;
  createdAt: string;
}

const UserManagement: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [userName, setUserName] = useState<string>('');
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'user' as 'user' | 'admin',
  });

  // Load users from Firestore
  const loadUsers = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'users'));
      const loadedUsers = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as User));
      setUsers(loadedUsers);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load users' });
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();
        if (userData) {
          setUserName(userData.name || 'Admin');
          setIsUserAdmin(userData.role === 'admin');
        }
      }
    };
    fetchUserData();
  }, []);

  const handleOpenDialog = () => {
    setEditingUser(null);
    setFormData({
      email: '',
      password: '',
      name: '',
      role: 'user',
    });
    setDialogOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setFormData({
      email: user.email,
      password: '',
      name: user.name,
      role: user.role,
    });
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCreateUser = async () => {
    try {
      if (editingUser) {
        // Update existing user
        await setDoc(doc(db, 'users', editingUser.id), {
          email: formData.email,
          name: formData.name,
          role: formData.role,
          suspended: editingUser.suspended || false,
          createdAt: editingUser.createdAt,
        });
        setMessage({ type: 'success', text: 'User updated successfully!' });
      } else {
        // Create user in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        
        // Store user data in Firestore
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          email: formData.email,
          name: formData.name,
          role: formData.role,
          suspended: false,
          createdAt: new Date().toISOString(),
        });
        setMessage({ type: 'success', text: 'User created successfully!' });
      }
      
      handleCloseDialog();
      loadUsers();
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to save user' });
      console.error('Error saving user:', error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user? This will remove them from the database.')) {
      try {
        // Delete from Firestore
        await deleteDoc(doc(db, 'users', userId));
        
        // Note: Deleting from Firebase Auth requires admin SDK or the user to be signed in
        // For now, we can only delete from Firestore. Admin needs to manually delete from Auth console
        // or we need to implement a Cloud Function for this.
        
        setMessage({ 
          type: 'success', 
          text: 'User deleted from database. Please also delete from Firebase Authentication console if needed.' 
        });
        loadUsers();
      } catch (error) {
        setMessage({ type: 'error', text: 'Failed to delete user' });
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleToggleSuspend = async (user: User) => {
    try {
      await setDoc(doc(db, 'users', user.id), {
        ...user,
        suspended: !user.suspended,
      });
      setMessage({ 
        type: 'success', 
        text: user.suspended ? 'User activated successfully!' : 'User suspended successfully!' 
      });
      loadUsers();
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update user status' });
      console.error('Error updating user:', error);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleMenuClick = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const menuItems = [
    { icon: <Home />, text: 'Videos', action: () => { navigate('/videos'); handleDrawerClose(); } },
    { icon: <Settings />, text: 'Settings', action: () => { navigate('/settings'); handleDrawerClose(); } },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Header onMenuClick={handleMenuClick} />
      <Container maxWidth="lg" sx={{ py: 2 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3, mt: 2 }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
          <Tab icon={<VideoLibrary />} label="Videos" />
          <Tab icon={<Category />} label="Categories" />
          <Tab icon={<People />} label="Users" />
          <Tab icon={<Settings />} label="Site Settings" />
        </Tabs>
      </Box>

      {tabValue === 0 && <AdminPanel />}
      
      {tabValue === 1 && <CategoryManagement />}
      
      {tabValue === 2 && (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <People sx={{ fontSize: 40, color: 'primary.main' }} />
              <Typography variant="h4" fontWeight={600}>
                User Management
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleOpenDialog}
              size="large"
            >
              Add User
            </Button>
          </Box>

          {message && (
            <Alert severity={message.type} onClose={() => setMessage(null)} sx={{ mb: 3 }}>
              {message.text}
            </Alert>
          )}

          <Paper elevation={2}>
            <List>
              {users.length === 0 ? (
                <ListItem>
                  <ListItemText 
                    primary="No users yet" 
                    secondary="Click 'Add User' to create your first user"
                  />
                </ListItem>
              ) : (
                users.map((user) => (
                  <ListItem
                    key={user.id}
                    secondaryAction={
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton 
                          edge="end" 
                          onClick={() => handleToggleSuspend(user)}
                          color={user.suspended ? 'success' : 'warning'}
                          title={user.suspended ? 'Activate User' : 'Suspend User'}
                        >
                          <Block />
                        </IconButton>
                        <IconButton edge="end" onClick={() => handleEditUser(user)}>
                          <Edit />
                        </IconButton>
                        <IconButton edge="end" onClick={() => handleDeleteUser(user.id)}>
                          <Delete />
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography 
                            variant="body1" 
                            fontWeight={600}
                            sx={{ 
                              textDecoration: user.suspended ? 'line-through' : 'none',
                              color: user.suspended ? 'text.disabled' : 'text.primary'
                            }}
                          >
                            {user.name}
                          </Typography>
                          <Chip 
                            label={user.role} 
                            size="small" 
                            color={user.role === 'admin' ? 'error' : 'default'}
                          />
                          {user.suspended && (
                            <Chip 
                              label="Suspended" 
                              size="small" 
                              color="warning"
                            />
                          )}
                        </Box>
                      }
                      secondary={`${user.email} • Created: ${new Date(user.createdAt).toLocaleDateString()}`}
                    />
                  </ListItem>
                ))
              )}
            </List>
          </Paper>

          {/* Add/Edit User Dialog */}
          <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
            <DialogTitle>{editingUser ? 'Edit User' : 'Add New User'}</DialogTitle>
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
                  label="Email"
                  type="email"
                  fullWidth
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={!!editingUser}
                  helperText={editingUser ? 'Email cannot be changed' : ''}
                />
                {!editingUser && (
                  <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    helperText="Minimum 6 characters"
                  />
                )}
                <FormControl fullWidth>
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={formData.role}
                    label="Role"
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as 'user' | 'admin' })}
                  >
                    <MenuItem value="user">User (Videos Only)</MenuItem>
                    <MenuItem value="admin">Admin (Full Access)</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button onClick={handleCreateUser} variant="contained">
                {editingUser ? 'Update User' : 'Create User'}
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}

      {tabValue === 3 && <SiteSettings />}

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerClose}
      >
        <Box sx={{ width: 250 }}>
          <Box sx={{ p: 2, backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: '#4CAF50' }}>
              {userName.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight={600}>
                {userName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {isUserAdmin ? 'Admin' : 'User'}
              </Typography>
            </Box>
          </Box>
          <Divider />
          <List>
            {menuItems.map((item, index) => (
              <ListItem 
                key={index}
                onClick={item.action}
                sx={{ cursor: 'pointer' }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
            <Divider />
            <ListItem 
              onClick={() => { handleLogout(); handleDrawerClose(); }}
              sx={{ cursor: 'pointer', color: 'error.main' }}
            >
              <ListItemIcon><Logout sx={{ color: 'error.main' }} /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      </Container>
    </Box>
  );
};

export default UserManagement;
