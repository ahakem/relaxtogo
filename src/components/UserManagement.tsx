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
} from '@mui/material';
import { Delete, Add, People, VideoLibrary } from '@mui/icons-material';
import { collection, addDoc, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import AdminPanel from './AdminPanel';

interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [tabValue, setTabValue] = useState(0);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
  }, []);

  const handleOpenDialog = () => {
    setFormData({
      email: '',
      password: '',
      role: 'user',
    });
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCreateUser = async () => {
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      
      // Store user data in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: formData.email,
        role: formData.role,
        createdAt: new Date().toISOString(),
      });
      
      setMessage({ type: 'success', text: 'User created successfully!' });
      handleCloseDialog();
      loadUsers();
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to create user' });
      console.error('Error creating user:', error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteDoc(doc(db, 'users', userId));
        setMessage({ type: 'success', text: 'User deleted successfully!' });
        loadUsers();
      } catch (error) {
        setMessage({ type: 'error', text: 'Failed to delete user' });
        console.error('Error deleting user:', error);
      }
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab icon={<VideoLibrary />} label="Videos" />
          <Tab icon={<People />} label="Users" />
        </Tabs>
      </Box>

      {tabValue === 0 && <AdminPanel />}
      
      {tabValue === 1 && (
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
                      <IconButton edge="end" onClick={() => handleDeleteUser(user.id)}>
                        <Delete />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {user.email}
                          <Chip 
                            label={user.role} 
                            size="small" 
                            color={user.role === 'admin' ? 'error' : 'default'}
                          />
                        </Box>
                      }
                      secondary={`Created: ${new Date(user.createdAt).toLocaleDateString()}`}
                    />
                  </ListItem>
                ))
              )}
            </List>
          </Paper>

          {/* Add User Dialog */}
          <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
            <DialogTitle>Add New User</DialogTitle>
            <DialogContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  helperText="Minimum 6 characters"
                />
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
                Create User
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Container>
  );
};

export default UserManagement;
