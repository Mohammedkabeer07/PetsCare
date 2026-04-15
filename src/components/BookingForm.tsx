import React, { useState } from 'react';
import { useAuth } from '@/src/lib/AuthContext';
import { db, handleFirestoreError, OperationType } from '@/src/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Calendar as CalendarIcon, Clock, ClipboardList } from 'lucide-react';

export function BookingForm() {
  const { user, signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    serviceType: '',
    date: '',
    time: '',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in to book a service');
      signIn();
      return;
    }

    if (!formData.serviceType || !formData.date || !formData.time) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    const path = 'bookings';
    try {
      await addDoc(collection(db, path), {
        ...formData,
        userId: user.uid,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      toast.success('Booking request sent successfully!');
      setFormData({ serviceType: '', date: '', time: '', notes: '' });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
      toast.error('Failed to book service. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-dark-surface rounded-none p-10 border border-dark-border">
      <div className="mb-10">
        <span className="text-gold text-[10px] uppercase tracking-[0.3em] mb-3 block">Boutique Wellness</span>
        <h2 className="text-3xl font-serif font-light text-white tracking-wide">Request Consultation</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-3">
          <Label htmlFor="serviceType" className="text-[10px] uppercase tracking-widest text-muted-text">Service Type</Label>
          <Select 
            value={formData.serviceType} 
            onValueChange={(val) => setFormData(prev => ({ ...prev, serviceType: val }))}
          >
            <SelectTrigger className="rounded-none h-14 bg-dark-bg border-dark-border text-dark-text focus:ring-gold/20">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent className="bg-dark-surface border-dark-border text-dark-text">
              <SelectItem value="veterinary" className="focus:bg-gold focus:text-black">Veterinary Checkup</SelectItem>
              <SelectItem value="grooming" className="focus:bg-gold focus:text-black">Professional Grooming</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="date" className="text-[10px] uppercase tracking-widest text-muted-text">Preferred Date</Label>
            <div className="relative">
              <Input
                id="date"
                type="date"
                className="rounded-none h-14 bg-dark-bg border-dark-border text-dark-text pl-12 focus:ring-gold/20"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              />
              <CalendarIcon className="absolute left-4 top-4.5 h-5 w-5 text-gold/40" />
            </div>
          </div>
          <div className="space-y-3">
            <Label htmlFor="time" className="text-[10px] uppercase tracking-widest text-muted-text">Preferred Time</Label>
            <div className="relative">
              <Input
                id="time"
                type="time"
                className="rounded-none h-14 bg-dark-bg border-dark-border text-dark-text pl-12 focus:ring-gold/20"
                value={formData.time}
                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
              />
              <Clock className="absolute left-4 top-4.5 h-5 w-5 text-gold/40" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="notes" className="text-[10px] uppercase tracking-widest text-muted-text">Additional Notes</Label>
          <Textarea
            id="notes"
            placeholder="Tell us about your pet's needs..."
            className="rounded-none min-h-[120px] bg-dark-bg border-dark-border text-dark-text focus:ring-gold/20"
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-transparent border border-gold text-gold hover:bg-gold hover:text-black h-16 rounded-none text-[11px] uppercase tracking-[0.3em] font-medium transition-all"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Send Request'}
        </Button>
      </form>
    </div>
  );
}
