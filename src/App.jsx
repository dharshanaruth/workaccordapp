import React, { useState } from 'react';
import {  
  CheckCircle2, AlertCircle, Users, FileText, Lock,  
  HelpCircle, ChevronRight, ChevronDown, Download, Upload, Eye, EyeOff,  
  Settings, Clock, Award, Building2, Sliders, ExternalLink,
  Info, ArrowRight, Check, X, ShieldAlert, Sparkles, UserCheck, Scale, BarChart3,
  Briefcase, ArrowUpRight, BookOpen, LogIn, Calendar, CheckCircle, HeartHandshake,
  MessageSquare, Coffee, Shield, Plus, Trash2, User, FileSpreadsheet, UserPlus, UserMinus,
  Pencil, Trash, Search, ExternalLink as LinkIcon, Camera, FileUp, Mail
} from 'lucide-react';

export default function App() {
  const [authView, setAuthView] = useState('login');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [appRole, setAppRole] = useState('employee');
  const [showPolicyModal, setShowPolicyModal] = useState(false);

  // Company Policies State (Managed by HR)
  const [companyPolicies, setCompanyPolicies] = useState([
    { id: 1, name: 'Workplace Adjustments & Accessibility Policy 2026', fileType: 'PDF Document' }
  ]);

  const [viewingPolicy, setViewingPolicy] = useState(null);
  const [newPolicyNameInput, setNewPolicyNameInput] = useState('');

  const handleUploadPolicy = (e) => {
    e.preventDefault();
    if (!newPolicyNameInput.trim()) return;
    setCompanyPolicies([
      ...companyPolicies,
      { id: Date.now(), name: newPolicyNameInput, fileType: 'PDF Document' }
    ]);
    setNewPolicyNameInput('');
  };

  const handleDeletePolicy = (id) => {
    setCompanyPolicies(companyPolicies.filter(p => p.id !== id));
  };

  // Clean Production Directory
  const [directoryEmployees, setDirectoryEmployees] = useState([]);

  const [employeeDetails, setEmployeeDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    initials: 'UA',
    title: 'Pending Onboarding',
    department: 'General Dept',
    manager: 'HR Admin',
    avatarUrl: null
  });

  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [tempAvatarInput, setTempAvatarInput] = useState('');

  const handleAvatarSubmit = (e) => {
    e.preventDefault();
    if (!tempAvatarInput.trim()) return;
    setEmployeeDetails({ ...employeeDetails, avatarUrl: tempAvatarInput });
    setTempAvatarInput('');
    setShowAvatarModal(false);
  };

  const handleToggleIsManager = (id) => {
    setDirectoryEmployees(directoryEmployees.map(emp => emp.id === id ? { ...emp, isManager: !emp.isManager } : emp));
  };

  const currentUserRecord = directoryEmployees.find(e => e.email.toLowerCase() === employeeDetails.email.toLowerCase()) || { isManager: true };
  const isUserAManager = currentUserRecord.isManager;

  const [hrInspectedEmployee, setHrInspectedEmployee] = useState(null);

  // Edit Job Role Modal State
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [editFirstNameInput, setEditFirstNameInput] = useState('');
  const [editLastNameInput, setEditLastNameInput] = useState('');
  const [editEmailInput, setEditEmailInput] = useState('');
  const [editRoleInput, setEditRoleInput] = useState('');
  const [editDeptInput, setEditDeptInput] = useState('');
  const [editManagerInput, setEditManagerInput] = useState('');

  const handleOpenEditRole = (emp) => {
    setEditingEmployee(emp);
    setEditFirstNameInput(emp.firstName);
    setEditLastNameInput(emp.lastName);
    setEditEmailInput(emp.email);
    setEditRoleInput(emp.title);
    setEditDeptInput(emp.department);
    setEditManagerInput(emp.manager);
  };

  const handleSaveJobRole = (e) => {
    e.preventDefault();
    if (!editingEmployee) return;
    const updatedDirectory = directoryEmployees.map(emp => emp.id === editingEmployee.id ? {
      ...emp,
      firstName: editFirstNameInput,
      lastName: editLastNameInput,
      email: editEmailInput,
      title: editRoleInput,
      department: editDeptInput,
      manager: editManagerInput,
      initials: `${editFirstNameInput[0] || ''}${editLastNameInput[0] || ''}`.toUpperCase()
    } : emp);

    setDirectoryEmployees(updatedDirectory);
    setEditingEmployee(null);
  };

  const [newStarterName, setNewStarterName] = useState('');
  const [newStarterEmail, setNewStarterEmail] = useState('');
  const [newStarterTitle, setNewStarterTitle] = useState('');
  const [newStarterDept, setNewStarterDept] = useState('');
  const [newStarterManager, setNewStarterManager] = useState('');

  const [offboardEmailInput, setOffboardEmailInput] = useState('');
  const [offboardTargetEmployee, setOffboardTargetEmployee] = useState(null);

  const handleCreateNewStarter = (e) => {
    e.preventDefault();
    if (!newStarterName || !newStarterEmail) return;
    const nameParts = newStarterName.trim().split(' ');
    const fName = nameParts[0] || 'New';
    const lName = nameParts.slice(1).join(' ') || 'Starter';
    const initials = `${fName[0]}${lName[0] || fName[1] || ''}`.toUpperCase();

    const newEmp = {
      id: Date.now(),
      firstName: fName,
      lastName: lName,
      email: newStarterEmail,
      title: newStarterTitle || 'Employee',
      department: newStarterDept || 'General Dept',
      manager: newStarterManager || 'Line Manager',
      initials: initials,
      sharingLevel: 'hr_only',
      isManager: false
    };

    setDirectoryEmployees([...directoryEmployees, newEmp]);
    
    if (!employeeDetails.email) {
      setEmployeeDetails({
        firstName: fName,
        lastName: lName,
        email: newStarterEmail,
        initials: initials,
        title: newStarterTitle || 'Employee',
        department: newStarterDept || 'General Dept',
        manager: newStarterManager || 'Line Manager',
        avatarUrl: null
      });
    }

    setNewStarterName('');
    setNewStarterEmail('');
    setNewStarterTitle('');
    setNewStarterDept('');
    setNewStarterManager('');
    setHrActionModal(null);
    alert('New starter registered and onboarded successfully!');
  };

  const handleSearchOffboard = (e) => {
    e.preventDefault();
    const found = directoryEmployees.find(emp => emp.email.toLowerCase() === offboardEmailInput.trim().toLowerCase());
    if (found) {
      setOffboardTargetEmployee(found);
    } else {
      alert('No employee found matching this company email address.');
    }
  };

  const handleConfirmOffboard = () => {
    if (!offboardTargetEmployee) return;
    setDirectoryEmployees(directoryEmployees.filter(emp => emp.id !== offboardTargetEmployee.id));
    setOffboardTargetEmployee(null);
    setOffboardEmailInput('');
    setHrActionModal(null);
    alert('Employee profile successfully archived and removed from directory.');
  };

  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);

  const [supportCategories, setSupportCategories] = useState([
    'Mobility / Physical: (e.g., walking, climbing stairs, using arms/hands, dexterity)',
    'Mental Health: (e.g., anxiety, depression, bipolar, PTSD)',
    'Neurodivergent / Learning: (e.g., autism, ADHD, dyslexia, dyspraxia)'
  ]);

  const [showCategoryPopup, setShowCategoryPopup] = useState(false);
  const [editingCatIndex, setEditingCatIndex] = useState(null);
  const [categoryInputText, setCategoryInputText] = useState('');

  const handleSaveCategory = (e) => {
    e.preventDefault();
    if (!categoryInputText.trim()) return;
    if (editingCatIndex !== null) {
      const updated = [...supportCategories];
      updated[editingCatIndex] = categoryInputText;
      setSupportCategories(updated);
    } else {
      setSupportCategories([...supportCategories, categoryInputText]);
    }
    setCategoryInputText('');
    setEditingCatIndex(null);
  };

  const handleDeleteCategory = (index) => {
    setSupportCategories(supportCategories.filter((_, idx) => idx !== index));
  };

  const [selectedCategory, setSelectedCategory] = useState('');
  const [sharingLevel, setSharingLevel] = useState('hr_only');

  const [preferencesList, setPreferencesList] = useState([]);
  const [showAddPrefModal, setShowAddPrefModal] = useState(false);
  const [newPrefTitle, setNewPrefTitle] = useState('');
  const [newPrefDesc, setNewPrefDesc] = useState('');

  const handleAddPreference = (e) => {
    e.preventDefault();
    if (!newPrefTitle.trim()) return;
    setPreferencesList([
      ...preferencesList,
      { id: Date.now(), title: newPrefTitle, description: newPrefDesc || 'Custom working preference' }
    ]);
    setNewPrefTitle('');
    setNewPrefDesc('');
    setShowAddPrefModal(false);
  };

  const handleDeletePreference = (id) => {
    setPreferencesList(preferencesList.filter(p => p.id !== id));
  };

  const [pcps, setPcps] = useState([]);

  const [hrPcpInputs, setHrPcpInputs] = useState({
    workplaceRule: '',
    workplaceAim: '',
    operationalRule: '',
    operationalAim: '',
    workplaceAlt: '',
    operationalAlt: ''
  });

  const handleSaveHrPcpSubmissions = (e) => {
    e.preventDefault();
    const targetName = hrInspectedEmployee ? `${hrInspectedEmployee.firstName} ${hrInspectedEmployee.lastName}` : `${employeeDetails.firstName} ${employeeDetails.lastName}`;
    const targetTitle = hrInspectedEmployee ? hrInspectedEmployee.title : employeeDetails.title;

    const newSubmissions = [];
    if (hrPcpInputs.workplaceRule.trim() || hrPcpInputs.workplaceAim.trim()) {
      newSubmissions.push({
        id: Date.now() + 1,
        type: 'WORKPLACE PRACTICE',
        rule: hrPcpInputs.workplaceRule || 'Custom Workplace Practice Standard',
        aim: hrPcpInputs.workplaceAim || 'Ensure operational alignment.',
        status: 'Pending Manager Agreement',
        alternative: hrPcpInputs.workplaceAlt,
        employeeName: targetName,
        employeeTitle: targetTitle
      });
    }
    if (hrPcpInputs.operationalRule.trim() || hrPcpInputs.operationalAim.trim()) {
      newSubmissions.push({
        id: Date.now() + 2,
        type: 'OPERATIONAL STANDARD',
        rule: hrPcpInputs.operationalRule || 'Custom Operational Standard',
        aim: hrPcpInputs.operationalAim || 'Meet delivery commitments.',
        status: 'Pending Manager Agreement',
        alternative: hrPcpInputs.operationalAlt,
        employeeName: targetName,
        employeeTitle: targetTitle
      });
    }

    if (newSubmissions.length > 0) {
      setPcps([...pcps, ...newSubmissions]);
      setHrPcpInputs({ workplaceRule: '', workplaceAim: '', operationalRule: '', operationalAim: '', workplaceAlt: '', operationalAlt: '' });
      alert('Role standards submitted successfully! Notification simulated to manager email.');
    } else {
      alert('Please fill out at least one rule and objective.');
    }
  };

  const [showAlternativeModal, setShowAlternativeModal] = useState(false);
  const [selectedPcp, setSelectedPcp] = useState(null);
  const [alternativeInput, setAlternativeInput] = useState('');

  const handleOpenAlternative = (pcp) => {
    setSelectedPcp(pcp);
    setAlternativeInput(pcp.alternative || '');
    setShowAlternativeModal(true);
  };

  const handleSaveAlternative = (e) => {
    e.preventDefault();
    if (!selectedPcp) return;
    setPcps(pcps.map(p => p.id === selectedPcp.id ? {
      ...p,
      status: 'Submitted',
      alternative: alternativeInput
    } : p));
    setShowAlternativeModal(false);
    setSelectedPcp(null);
    setAlternativeInput('');
  };

  const handleAgreePcp = (pcp) => {
    setPcps(pcps.map(p => p.id === pcp.id ? { ...p, status: 'Active & Agreed' } : p));
    alert(`Role Standard agreed! Notification sent to employee email (${employeeDetails.email || 'employee@company.co.uk'}).`);
  };

  const handleEscalatePcp = (pcp) => {
    setPcps(pcps.map(p => p.id === pcp.id ? { ...p, status: 'Escalated to HR' } : p));
    alert('Role Standard escalated to HR Admin. Notification sent to HR email.');
  };

  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedMainGroup, setSelectedMainGroup] = useState('Working Arrangements & Hours');
  const [selectedSubOption, setSelectedSubOption] = useState(null);
  const [requestDetailInput, setRequestDetailInput] = useState('');

  const requestGroups = {
    'Working Arrangements & Hours': ['Flexible hours', 'Remote working', 'Phased return', 'Extra breaks', 'Compressed hours'],
    'Workplace & Physical Environment': ['Ergonomic equipment', 'Workstation relocation', 'Sensory adjustments', 'Noise management', 'Physical adaptations'],
    'Technology & Tools': ['Screen readers', 'Speech-to-text', 'Text-to-speech', 'Visual aids', 'Meeting accessibility']
  };

  const [adjustments, setAdjustments] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);

  const [managerApprovalModal, setManagerApprovalModal] = useState(null);
  const [mgrAgreedDate, setMgrAgreedDate] = useState('Today');
  const [mgrReviewDate, setMgrReviewDate] = useState('1 Year');

  const [hrEscalationReviewModal, setHrEscalationReviewModal] = useState(null);
  const [hrAgreedDate, setHrAgreedDate] = useState('Today');
  const [hrReviewDate, setHrReviewDate] = useState('1 Year');
  const [hrCancelReason, setHrCancelReason] = useState('');
  const [hrAlternativeSuggestion, setHrAlternativeSuggestion] = useState('');

  const [showExportModal, setShowExportModal] = useState(false);
  const [hrActionModal, setHrActionModal] = useState(null);
  const [hrActiveTab, setHrActiveTab] = useState('directory');

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!userEmail) return;
    if (authView === 'signup' && userPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setUserEmail(userEmail);
    setAuthView('app');
  };

  const handleSubmittingNewRequest = () => {
    if (!selectedSubOption) return;
    const newReq = {
      id: Date.now(),
      title: selectedSubOption,
      category: selectedMainGroup,
      details: requestDetailInput || 'Requested by employee.',
      status: 'Pending Manager Approval',
      employeeName: `${employeeDetails.firstName || 'Employee'} ${employeeDetails.lastName || ''}`,
      employeeTitle: employeeDetails.title,
      employeeEmail: employeeDetails.email || userEmail
    };
    setPendingRequests([...pendingRequests, newReq]);
    setShowRequestModal(false);
    setSelectedSubOption(null);
    setRequestDetailInput('');
    alert('Adjustment requested! Notification email sent to line manager.');
  };

  if (authView === 'login' || authView === 'signup') {
    return (
      <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 selection:bg-[#d00000] selection:text-white">
        <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 shadow-2xl border border-slate-200 rounded-3xl">
          <div>
            <div className="flex items-center justify-center gap-3.5 mb-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#d00000] to-[#b00000] flex items-center justify-center text-white shadow-md">
                <span className="font-extrabold">WA</span>
              </div>
              <span className="text-2xl font-extrabold text-slate-900 tracking-tight">Work<span className="text-[#d00000]">Accord</span></span>
            </div>
            <h2 className="text-center text-xl font-extrabold text-slate-900">
              {authView === 'login' ? 'Sign in to your company workspace' : 'Create your employee account'}
            </h2>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4 text-xs mt-6">
            <div className="space-y-1">
              <label className="font-bold uppercase tracking-wider text-slate-700">Company Email Address</label>
              <input required type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-sm font-bold text-slate-800 focus:outline-none focus:border-[#d00000]" placeholder="name@company.co.uk" />
            </div>
            <div className="space-y-1">
              <label className="font-bold uppercase tracking-wider text-slate-700">Password</label>
              <input required type="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-sm font-bold text-slate-800 focus:outline-none focus:border-[#d00000]" placeholder="••••••••••••" />
            </div>
            {authView === 'signup' && (
              <div className="space-y-1">
                <label className="font-bold uppercase tracking-wider text-slate-700">Confirm Password</label>
                <input required type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-sm font-bold text-slate-800 focus:outline-none focus:border-[#d00000]" placeholder="••••••••••••" />
              </div>
            )}
            <button type="submit" className="w-full py-4 text-sm font-extrabold text-white bg-[#d00000] hover:bg-[#b00000] rounded-2xl shadow-lg transition-all mt-2">
              {authView === 'login' ? 'Access Secure Workspace' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#d00000] selection:text-white">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#d00000] to-[#b00000] flex items-center justify-center text-white shadow-md">
              <span className="font-extrabold">WA</span>
            </div>
            <div>
              <div className="text-2xl font-extrabold tracking-tight text-slate-900">Work<span className="text-[#d00000]">Accord</span></div>
              <span className="text-[11px] text-slate-400 font-semibold">workaccord.co.uk</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setAuthView('login')} className="text-xs sm:text-sm font-bold text-[#6b6b65] hover:text-slate-900 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all">
              Sign Out
            </button>
          </div>
        </div>

        {/* Clean Header Bar without 'Interactive Roles:' text */}
        <div className="bg-[#d00000] text-white px-4 sm:px-6 lg:px-8 py-3 shadow-md">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex bg-black/20 p-1 rounded-2xl border border-white/15">
              <button onClick={() => { setAppRole('employee'); setHrInspectedEmployee(null); }} className={`px-4 py-1.5 text-xs sm:text-sm font-bold rounded-xl transition-all ${appRole === 'employee' && !hrInspectedEmployee ? 'bg-white text-[#d00000] shadow-md' : 'text-white/90'}`}>Employee View</button>
              {isUserAManager && (
                <button onClick={() => { setAppRole('manager'); setHrInspectedEmployee(null); }} className={`px-4 py-1.5 text-xs sm:text-sm font-bold rounded-xl transition-all ${appRole === 'manager' ? 'bg-white text-[#d00000] shadow-md' : 'text-white/90'}`}>Manager View</button>
              )}
              <button onClick={() => { setAppRole('hr'); setHrInspectedEmployee(null); }} className={`px-4 py-1.5 text-xs sm:text-sm font-bold rounded-xl transition-all ${appRole === 'hr' && !hrInspectedEmployee ? 'bg-white text-[#d00000] shadow-md' : 'text-white/90'}`}>HR Admin</button>
            </div>
            <button onClick={() => setShowPolicyModal(true)} className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-xs sm:text-sm font-bold text-white">
              <BookOpen className="w-4 h-4" /> <span>Company Policy</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {hrInspectedEmployee && (
          <div className="bg-amber-50 border border-amber-300 p-4 rounded-2xl mb-8 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-700" />
              <span className="text-xs font-bold text-amber-900">
                HR Audit Inspection Mode: Viewing profile for <strong>{hrInspectedEmployee.firstName} {hrInspectedEmployee.lastName}</strong> (Read-Only)
              </span>
            </div>
            <button 
              onClick={() => setHrInspectedEmployee(null)} 
              className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-extrabold rounded-xl shadow-sm transition-all"
            >
              Return to HR Dashboard
            </button>
          </div>
        )}

        {appRole === 'employee' && (
          <div className="space-y-12">
            <div className="bg-white rounded-3xl border border-slate-200 p-7 sm:p-9 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div 
                  onClick={() => !hrInspectedEmployee && setShowAvatarModal(true)}
                  className={`relative group w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#d00000] to-[#ff5959] text-white flex items-center justify-center font-black text-2xl overflow-hidden shadow-md ${!hrInspectedEmployee ? 'cursor-pointer hover:opacity-95' : ''}`}
                  title={!hrInspectedEmployee ? "Click to change profile picture" : ""}
                >
                  {hrInspectedEmployee ? (
                    <span>{hrInspectedEmployee.initials}</span>
                  ) : (
                    employeeDetails.avatarUrl ? (
                      <img src={employeeDetails.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span>{employeeDetails.initials}</span>
                    )
                  )}
                  {!hrInspectedEmployee && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[10px] font-bold">
                      <Camera className="w-4 h-4 mb-0.5" /> Change
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {hrInspectedEmployee ? `${hrInspectedEmployee.firstName} ${hrInspectedEmployee.lastName}` : (employeeDetails.firstName ? `${employeeDetails.firstName} ${employeeDetails.lastName}` : 'New Employee')}
                  </h1>
                  <p className="text-sm text-[#6b6b65] font-medium">
                    {hrInspectedEmployee ? `${hrInspectedEmployee.title} · ${hrInspectedEmployee.department}` : `${employeeDetails.title} · ${employeeDetails.department}`}
                  </p>
                  <p className="text-xs text-slate-500 font-semibold">
                    {hrInspectedEmployee ? hrInspectedEmployee.manager : employeeDetails.manager}
                  </p>
                  <span className="inline-flex items-center gap-1.5 font-bold text-[#00a782] px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs mt-1">
                    {adjustments.length} Active Adjustments
                  </span>
                </div>
              </div>
              {!hrInspectedEmployee && (
                <button onClick={() => setShowRequestModal(true)} className="px-6 py-3.5 bg-[#d00000] hover:bg-[#b00000] text-white text-sm font-extrabold rounded-2xl shadow-lg shadow-red-500/20 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> + Request Adjustment
                </button>
              )}
            </div>

            {(!hrInspectedEmployee || hrInspectedEmployee.sharingLevel === 'hr_only' || hrInspectedEmployee.sharingLevel === 'full') && (
              <section className="bg-white rounded-3xl border border-slate-200 p-7 sm:p-9 shadow-md space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#d00000] flex items-center justify-center font-bold">
                      <HeartHandshake className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Personal Support & Workplace Needs</h2>
                      <p className="text-sm text-[#6b6b65] font-medium mt-0.5">Select your primary support requirement category below.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">Support Requirement For</label>
                  <select 
                    disabled={!!hrInspectedEmployee}
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-4 sm:py-5 rounded-2xl border border-slate-300 text-sm text-slate-700 font-medium bg-white focus:outline-none focus:border-[#d00000]"
                  >
                    <option value="" disabled>Select support requirement category...</option>
                    {supportCategories.map((cat, idx) => (
                      <option key={idx} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {!hrInspectedEmployee && (
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3.5 mt-6">
                    <span className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
                      Who should have access to your health & support context?
                    </span>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div 
                        onClick={() => setSharingLevel('self')}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                          sharingLevel === 'self' ? 'bg-white border-[#d00000] shadow-md ring-2 ring-red-100 scale-[1.01]' : 'bg-white/80 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-bold text-slate-900">Self Only</span>
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${sharingLevel === 'self' ? 'border-[#d00000] bg-[#d00000]' : 'border-slate-300'}`}>
                            {sharingLevel === 'self' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                          </div>
                        </div>
                        <p className="text-xs text-[#6b6b65] leading-relaxed">Hidden from manager & HR. Personal tracker only.</p>
                      </div>

                      <div 
                        onClick={() => setSharingLevel('hr_only')}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                          sharingLevel === 'hr_only' ? 'bg-white border-[#d00000] shadow-md ring-2 ring-red-100 scale-[1.01]' : 'bg-white/80 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-bold text-slate-900">HR Admin Only</span>
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${sharingLevel === 'hr_only' ? 'border-[#d00000] bg-[#d00000]' : 'border-slate-300'}`}>
                            {sharingLevel === 'hr_only' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                          </div>
                        </div>
                        <p className="text-xs text-[#6b6b65] leading-relaxed">Line manager only views adjustments. Medical diagnosis is shielded.</p>
                      </div>

                      <div 
                        onClick={() => setSharingLevel('full')}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                          sharingLevel === 'full' ? 'bg-white border-[#d00000] shadow-md ring-2 ring-red-100 scale-[1.01]' : 'bg-white/80 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-bold text-slate-900">HR & Direct Manager</span>
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${sharingLevel === 'full' ? 'border-[#d00000] bg-[#d00000]' : 'border-slate-300'}`}>
                            {sharingLevel === 'full' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                          </div>
                        </div>
                        <p className="text-xs text-[#6b6b65] leading-relaxed">Shared openly with manager for direct support collaboration.</p>
                      </div>
                    </div>
                  </div>
                )}
              </section>
            )}

            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-2">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">My Workplace Adjustments</h2>
                  <p className="text-sm text-[#6b6b65] font-medium mt-1">
                    Your active adjustments, physical aids, and collaborative working preferences.
                  </p>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Updated Jun 2026
                </span>
              </div>

              <div className="grid lg:grid-cols-12 gap-7">
                <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-7 shadow-md space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-2xl bg-amber-50 text-[#4d3619] flex items-center justify-center font-bold shadow-sm">
                        <Sliders className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900">How I Work Best</h3>
                        <span className="text-xs text-slate-400 font-medium">Preferences shared with your team</span>
                      </div>
                    </div>
                    {!hrInspectedEmployee && (
                      <button
                        onClick={() => setShowAddPrefModal(true)}
                        className="px-3.5 py-2 bg-red-50 hover:bg-red-100 text-[#d00000] text-xs font-extrabold rounded-xl transition-all flex items-center gap-1.5 shadow-sm shrink-0"
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[3]" /> Add Preference
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto space-y-4 pr-1">
                    {preferencesList.length === 0 ? (
                      <p className="text-xs text-slate-400 py-4 text-center">No working preferences added yet.</p>
                    ) : (
                      preferencesList.map((pref) => (
                        <div key={pref.id} className="group relative flex items-center justify-between gap-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-slate-100/80 transition-all">
                          <div className="space-y-0.5">
                            <span className="text-sm font-bold text-slate-900 block">{pref.title}</span>
                            <span className="text-xs text-[#6b6b65]">{pref.description}</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full border-2 border-[#d00000] flex items-center justify-center shrink-0 group-hover:hidden">
                              <div className="w-2.5 h-2.5 rounded-full bg-[#d00000]"></div>
                            </div>
                            {!hrInspectedEmployee && (
                              <button
                                onClick={() => handleDeletePreference(pref.id)}
                                title="Delete preference"
                                className="hidden group-hover:flex w-7 h-7 rounded-xl bg-red-100 hover:bg-red-200 text-[#d00000] items-center justify-center transition-all shrink-0 shadow-sm"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Right Column: Agreed Accommodations (Renamed from Agreed Accommodation Passport) */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
                    <span>Agreed Accommodations</span>
                    <span className="text-[#00a782]">{adjustments.length} Active Agreements</span>
                  </div>

                  <div className="space-y-4">
                    {adjustments.length === 0 ? (
                      <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center text-xs text-slate-400 font-medium">
                        No active adjustments recorded yet.
                      </div>
                    ) : (
                      adjustments.map((adj) => (
                        <div key={adj.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <span className="text-base font-extrabold text-slate-900">{adj.title}</span>
                              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-[#00a782] border border-emerald-200">
                                • {adj.status}
                              </span>
                            </div>
                            <span className="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
                              <Lock className="w-3.5 h-3.5 text-[#00a782]" /> {adj.visibility || 'Line Manager & HR'}
                            </span>
                          </div>

                          <p className="text-sm text-slate-700 font-medium leading-relaxed">
                            {adj.details}
                          </p>

                          <div className="flex flex-wrap items-center gap-5 text-xs text-slate-400 font-semibold pt-2 border-t border-slate-100">
                            <span className="flex items-center gap-1.5 text-slate-600">
                              <CheckCircle className="w-4 h-4 text-[#00a782]" /> Agreed: {adj.approvedDate}
                            </span>
                            <span className="flex items-center gap-1.5 text-slate-600">
                              <Clock className="w-4 h-4 text-[#d00000]" /> Review Date: {adj.reviewDate}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Role Standards & Work Practices Section with Editable Alternative */}
            <section className="bg-white rounded-3xl border border-slate-200 p-7 sm:p-9 shadow-md space-y-6">
              <div className="flex items-center gap-3.5 border-b border-slate-100 pb-5">
                <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#d00000] flex items-center justify-center font-bold shadow-sm">
                  <Scale className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Role Standards & Work Practices</h2>
                  <p className="text-sm text-[#6b6b65] font-medium mt-0.5">General company standards. If a requirement creates an unintended barrier, explore or edit your proposed alternative.</p>
                </div>
              </div>

              {hrInspectedEmployee ? (
                <form onSubmit={handleSaveHrPcpSubmissions} className="space-y-6 bg-slate-50 p-6 rounded-3xl border border-slate-200">
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-3">Author Role Standards & Practices for {hrInspectedEmployee.firstName}</h3>
                  
                  <div className="space-y-3 bg-white p-5 rounded-2xl border border-slate-200">
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#d00000]">WORKPLACE PRACTICE</span>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 uppercase">Rule / Requirement</label>
                      <input 
                        type="text" 
                        value={hrPcpInputs.workplaceRule} 
                        onChange={(e) => setHrPcpInputs({ ...hrPcpInputs, workplaceRule: e.target.value })}
                        placeholder="Type workplace practice rule..." 
                        className="w-full p-3 rounded-xl border border-slate-300 text-xs font-bold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 uppercase">Business Objective</label>
                      <textarea 
                        rows="2"
                        value={hrPcpInputs.workplaceAim} 
                        onChange={(e) => setHrPcpInputs({ ...hrPcpInputs, workplaceAim: e.target.value })}
                        placeholder="Type business objective..." 
                        className="w-full p-3 rounded-xl border border-slate-300 text-xs"
                      ></textarea>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 uppercase">Your Proposed Alternative (Optional)</label>
                      <input 
                        type="text" 
                        value={hrPcpInputs.workplaceAlt} 
                        onChange={(e) => setHrPcpInputs({ ...hrPcpInputs, workplaceAlt: e.target.value })}
                        placeholder="Proposed alternative..." 
                        className="w-full p-3 rounded-xl border border-slate-300 text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 bg-white p-5 rounded-2xl border border-slate-200">
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#d00000]">OPERATIONAL STANDARD</span>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 uppercase">Rule / Standard</label>
                      <input 
                        type="text" 
                        value={hrPcpInputs.operationalRule} 
                        onChange={(e) => setHrPcpInputs({ ...hrPcpInputs, operationalRule: e.target.value })}
                        placeholder="Type operational standard rule..." 
                        className="w-full p-3 rounded-xl border border-slate-300 text-xs font-bold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 uppercase">Business Objective</label>
                      <textarea 
                        rows="2"
                        value={hrPcpInputs.operationalAim} 
                        onChange={(e) => setHrPcpInputs({ ...hrPcpInputs, operationalAim: e.target.value })}
                        placeholder="Type business objective..." 
                        className="w-full p-3 rounded-xl border border-slate-300 text-xs"
                      ></textarea>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 uppercase">Your Proposed Alternative (Optional)</label>
                      <input 
                        type="text" 
                        value={hrPcpInputs.operationalAlt} 
                        onChange={(e) => setHrPcpInputs({ ...hrPcpInputs, operationalAlt: e.target.value })}
                        placeholder="Proposed alternative..." 
                        className="w-full p-3 rounded-xl border border-slate-300 text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button type="submit" className="px-6 py-3 bg-[#d00000] hover:bg-[#b00000] text-white text-xs font-extrabold rounded-xl shadow-md">
                      Submit Standards for Manager Agreement
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  {pcps.length === 0 ? (
                    <p className="text-xs text-slate-400 text-center py-4">No role standards assigned yet.</p>
                  ) : (
                    pcps.map((pcp) => (
                      <div key={pcp.id} className="p-6 rounded-3xl border border-slate-200 bg-slate-50/50 space-y-4 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="space-y-1">
                            <span className="text-[11px] font-black uppercase tracking-wider text-[#d00000]">{pcp.type}</span>
                            <h3 className="text-lg font-black text-slate-900">{pcp.rule}</h3>
                          </div>
                          {pcp.status === 'Submitted' || pcp.status === 'Pending Manager Agreement' ? (
                            <span className="inline-flex items-center px-4 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-extrabold shadow-sm">
                              {pcp.status}
                            </span>
                          ) : pcp.status === 'Active & Agreed' ? (
                            <span className="inline-flex items-center px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-[#00a782] text-xs font-extrabold shadow-sm">
                              Active & Agreed
                            </span>
                          ) : (
                            <button
                              onClick={() => handleOpenAlternative(pcp)}
                              className="px-5 py-2.5 rounded-xl border-2 border-[#d00000] text-[#d00000] hover:bg-[#d00000] hover:text-white text-xs font-extrabold transition-all shadow-sm"
                            >
                              Explore / Edit Alternative
                            </button>
                          )}
                        </div>

                        <div className="bg-white p-4 rounded-2xl border border-slate-200 text-xs font-semibold text-slate-700">
                          <span className="text-slate-900 font-bold">Business Objective:</span> {pcp.aim}
                        </div>

                        {pcp.alternative && (
                          <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-200 text-xs font-semibold text-blue-900 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-extrabold uppercase tracking-wider text-blue-800">Your Proposed Alternative:</span>
                              <button onClick={() => handleOpenAlternative(pcp)} className="text-[#d00000] font-bold hover:underline">Edit Alternative</button>
                            </div>
                            <p className="font-medium text-slate-800 pt-0.5">{pcp.alternative}</p>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </section>
          </div>
        )}

        {/* MANAGER VIEW */}
        {appRole === 'manager' && isUserAManager && (
          <div className="space-y-10">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-md space-y-6">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">Pending Adjustment & Standard Approvals</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-3">Pending Agreed Accommodation Adjustments ({pendingRequests.length})</h3>
                  {pendingRequests.length === 0 ? (
                    <p className="text-xs text-slate-500">No pending adjustment requests.</p>
                  ) : (
                    <div className="space-y-4">
                      {pendingRequests.map((req) => (
                        <div key={req.id} className="p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-slate-50">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-extrabold text-slate-900">{req.employeeName}</span>
                              <span className="text-[11px] text-[#6b6b65] font-semibold">({req.employeeTitle})</span>
                            </div>
                            <span className="text-xs font-bold uppercase text-[#d00000]">{req.category}</span>
                            <h4 className="text-base font-bold text-slate-900">{req.title}</h4>
                            <p className="text-xs text-[#6b6b65]">{req.details}</p>
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <button onClick={() => {
                              setPendingRequests(pendingRequests.map(r => r.id !== req.id ? r : { ...r, status: 'Escalated to HR' }));
                              alert('Adjustment escalated to HR Admin email notification sent.');
                            }} className="px-3.5 py-2 bg-white border border-slate-300 text-slate-700 text-xs font-bold rounded-xl">Escalate</button>
                            
                            <button onClick={() => {
                              setManagerApprovalModal(req);
                            }} className="px-4 py-2 bg-[#00a782] hover:bg-[#008f6f] text-white text-xs font-extrabold rounded-xl shadow-sm">Approve</button>

                            <button onClick={() => {
                              const reason = prompt("Enter cancellation reason:");
                              const alt = prompt("Enter alternative suggestion:");
                              if (reason) {
                                setPendingRequests(pendingRequests.filter(r => r.id !== req.id));
                                alert(`Request cancelled. Email notification sent to employee (${req.employeeEmail}): Reason: ${reason}. Alternative: ${alt}`);
                              }
                            }} className="px-3.5 py-2 bg-red-50 border border-red-200 text-[#d00000] text-xs font-bold rounded-xl">Cancel</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-3">Role Standards & Work Practices (Agree or Escalate Only - No Cancel)</h3>
                  {pcps.filter(p => p.status === 'Pending Manager Agreement' || p.status === 'Submitted' || p.status === 'Escalated back to HR Admin').length === 0 ? (
                    <p className="text-xs text-slate-500">No pending role standards awaiting review.</p>
                  ) : (
                    <div className="space-y-4">
                      {pcps.filter(p => p.status === 'Pending Manager Agreement' || p.status === 'Submitted' || p.status === 'Escalated back to HR Admin').map((pcp) => (
                        <div key={pcp.id} className="p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-amber-50/50">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-extrabold text-slate-900">{pcp.employeeName}</span>
                              <span className="text-[11px] text-[#6b6b65] font-semibold">({pcp.employeeTitle})</span>
                            </div>
                            <span className="text-xs font-bold uppercase text-[#d00000]">{pcp.type}</span>
                            <h4 className="text-base font-bold text-slate-900">{pcp.rule}</h4>
                            <p className="text-xs text-slate-700"><strong>Objective:</strong> {pcp.aim}</p>
                            {pcp.alternative && <p className="text-xs text-blue-800"><strong>Alternative:</strong> {pcp.alternative}</p>}
                          </div>
                          <div className="flex items-center gap-3">
                            <button onClick={() => handleEscalatePcp(pcp)} className="px-4 py-2 bg-white border border-slate-300 text-slate-700 text-xs font-bold rounded-xl">Escalate to HR</button>
                            <button onClick={() => handleAgreePcp(pcp)} className="px-5 py-2 bg-[#00a782] hover:bg-[#008f6f] text-white text-xs font-extrabold rounded-xl shadow-sm">Agree & Publish</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Direct Team Members Card View */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-md space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Direct Team Members</h2>
                  <p className="text-xs text-[#6b6b65] font-medium mt-0.5">Click on any team member card to view their agreed adjustments and role standards.</p>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{teamMembers.length} Members</span>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                {teamMembers.length === 0 ? (
                  <p className="text-xs text-slate-400 py-4">No team members assigned yet.</p>
                ) : (
                  teamMembers.map((member) => (
                    <div 
                      key={member.id}
                      onClick={() => setSelectedTeamMember(member)}
                      className="p-5 rounded-2xl border-2 border-slate-200 hover:border-[#d00000] bg-slate-50 hover:bg-white cursor-pointer transition-all space-y-4 shadow-sm"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#d00000] to-[#ff5959] text-white flex items-center justify-center font-extrabold text-sm">
                          {member.initials}
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-slate-900">{member.firstName} {member.lastName}</h4>
                          <p className="text-xs text-[#6b6b65] font-medium">{member.title}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs font-semibold text-slate-600">
                        <span>{member.adjustments.length} Active Adjustments</span>
                        <span className="text-[#d00000] font-bold flex items-center gap-1">View Card <ChevronRight className="w-3.5 h-3.5" /></span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* HR ADMIN VIEW */}
        {appRole === 'hr' && !hrInspectedEmployee && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-md flex justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                <button onClick={() => setHrActionModal('csv')} className="py-4 px-6 bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs sm:text-sm font-extrabold rounded-2xl flex items-center justify-center gap-2.5 transition-all shadow-sm">
                  <FileSpreadsheet className="w-5 h-5 text-[#00a782]" /> Bulk CSV onboarding
                </button>
                <button onClick={() => setHrActionModal('new_starter')} className="py-4 px-6 bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs sm:text-sm font-extrabold rounded-2xl flex items-center justify-center gap-2.5 transition-all shadow-sm">
                  <UserPlus className="w-5 h-5 text-[#d00000]" /> New starter
                </button>
                <button onClick={() => setHrActionModal('offboard')} className="py-4 px-6 bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs sm:text-sm font-extrabold rounded-2xl flex items-center justify-center gap-2.5 transition-all shadow-sm">
                  <UserMinus className="w-5 h-5 text-slate-700" /> Offboard
                </button>
                <button onClick={() => setShowExportModal(true)} className="py-4 px-6 text-xs sm:text-sm font-extrabold text-white bg-[#d00000] hover:bg-[#b00000] rounded-2xl shadow-md flex items-center justify-center gap-2.5 transition-all">
                  <Download className="w-5 h-5" /> Export audit pdf
                </button>
              </div>
            </div>

            {/* HR Navigation Tabs */}
            <div className="flex gap-3 border-b border-slate-200 pb-3">
              <button 
                onClick={() => setHrActiveTab('directory')}
                className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${hrActiveTab === 'directory' ? 'bg-[#d00000] text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                Company Employee Directory ({directoryEmployees.length})
              </button>
              <button 
                onClick={() => setHrActiveTab('escalated')}
                className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${hrActiveTab === 'escalated' ? 'bg-[#d00000] text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                Adjustment Requests Escalated by Manager 
                <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">
                  {pendingRequests.filter(r => r.status === 'Escalated to HR').length + pcps.filter(p => p.status === 'Escalated to HR').length}
                </span>
              </button>
            </div>

            {hrActiveTab === 'directory' ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-md space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Company Employee Directory</h2>
                    <p className="text-xs text-[#6b6b65] font-medium mt-0.5">Inspect employee profiles, toggle manager privileges, and update job roles.</p>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{directoryEmployees.length} Employees</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 font-extrabold uppercase tracking-wider">
                        <th className="pb-3 px-4">Name</th>
                        <th className="pb-3 px-4">Email Address</th>
                        <th className="pb-3 px-4">Job Title</th>
                        <th className="pb-3 px-4">Manager</th>
                        <th className="pb-3 px-4">Department</th>
                        <th className="pb-3 px-4 text-center">Is a Manager?</th>
                        <th className="pb-3 px-4 text-center">View Profile</th>
                        <th className="pb-3 px-4 text-center">Edit Job Role</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {directoryEmployees.length === 0 ? (
                        <tr>
                          <td colSpan="8" className="text-center py-8 text-slate-400">No employees in directory yet. Use "New starter" above to onboard.</td>
                        </tr>
                      ) : (
                        directoryEmployees.map((emp) => (
                          <tr key={emp.id} className="hover:bg-slate-50 transition-all">
                            <td className="py-4 px-4 font-bold text-slate-900 flex items-center gap-3">
                              <div className="w-8 h-8 rounded-xl bg-red-50 text-[#d00000] flex items-center justify-center font-black text-xs">
                                {emp.initials}
                              </div>
                              <span>{emp.firstName} {emp.lastName}</span>
                            </td>
                            <td className="py-4 px-4 text-slate-600">{emp.email}</td>
                            <td className="py-4 px-4">{emp.title}</td>
                            <td className="py-4 px-4 text-slate-500">{emp.manager}</td>
                            <td className="py-4 px-4">{emp.department}</td>
                            
                            <td className="py-4 px-4 text-center">
                              <button
                                onClick={() => handleToggleIsManager(emp.id)}
                                title="Click to toggle manager status"
                                className={`px-3 py-1 rounded-full font-bold text-[11px] transition-all shadow-xs ${
                                  emp.isManager 
                                    ? 'bg-emerald-50 text-[#00a782] border border-emerald-200 hover:bg-emerald-100' 
                                    : 'bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200'
                                }`}
                              >
                                {emp.isManager ? 'Yes (Manager)' : 'No'}
                              </button>
                            </td>

                            <td className="py-4 px-4 text-center">
                              <button
                                onClick={() => {
                                  setHrInspectedEmployee(emp);
                                  setAppRole('employee');
                                }}
                                className="px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-[#00a782] font-extrabold rounded-xl inline-flex items-center gap-1 transition-all"
                              >
                                <LinkIcon className="w-3.5 h-3.5" /> View Profile
                              </button>
                            </td>
                            <td className="py-4 px-4 text-center">
                              <button
                                onClick={() => handleOpenEditRole(emp)}
                                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold rounded-xl inline-flex items-center gap-1 transition-all"
                              >
                                <Pencil className="w-3.5 h-3.5" /> Edit Role
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-md space-y-6">
                <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">Escalated Requests Awaiting HR Review</h2>
                {pendingRequests.filter(r => r.status === 'Escalated to HR').length === 0 && pcps.filter(p => p.status === 'Escalated to HR').length === 0 ? (
                  <p className="text-xs text-slate-400 py-6 text-center">No requests currently escalated by managers.</p>
                ) : (
                  <div className="space-y-4">
                    {pendingRequests.filter(r => r.status === 'Escalated to HR').map((req) => (
                      <div key={req.id} className="p-5 rounded-2xl border border-slate-200 bg-amber-50/40 flex justify-between items-center">
                        <div className="space-y-1">
                          <span className="text-xs font-bold text-slate-900">{req.employeeName} ({req.employeeTitle})</span>
                          <h4 className="text-sm font-bold text-slate-900">{req.title}</h4>
                          <p className="text-xs text-slate-600">{req.details}</p>
                        </div>
                        <button onClick={() => setHrEscalationReviewModal(req)} className="px-4 py-2 bg-[#d00000] text-white text-xs font-bold rounded-xl">Review & Resolve</button>
                      </div>
                    ))}
                    {pcps.filter(p => p.status === 'Escalated to HR').map((pcp) => (
                      <div key={pcp.id} className="p-5 rounded-2xl border border-slate-200 bg-amber-50/40 flex justify-between items-center">
                        <div className="space-y-1">
                          <span className="text-xs font-bold text-slate-900">{pcp.employeeName} ({pcp.employeeTitle})</span>
                          <h4 className="text-sm font-bold text-slate-900">{pcp.rule}</h4>
                          <p className="text-xs text-slate-600">Objective: {pcp.aim}</p>
                        </div>
                        <button onClick={() => setHrEscalationReviewModal(pcp)} className="px-4 py-2 bg-[#d00000] text-white text-xs font-bold rounded-xl">Review & Resolve</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div 
              onClick={() => setShowCategoryPopup(true)}
              className="bg-white rounded-3xl border border-slate-200 p-8 shadow-md space-y-4 cursor-pointer hover:border-[#d00000] transition-all group"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#d00000] transition-colors">Editable Support Categories List</h3>
                <span className="text-xs font-extrabold text-[#d00000] flex items-center gap-1">Manage Categories <ChevronRight className="w-4 h-4" /></span>
              </div>
              <ul className="space-y-2 text-xs font-medium text-slate-700">
                {supportCategories.map((cat, idx) => (
                  <li key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                    <span>{cat}</span>
                    <span className="text-[10px] bg-emerald-50 text-[#00a782] border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold">Configured</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </main>

      {/* MANAGER APPROVAL MODAL */}
      {managerApprovalModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 space-y-6 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">Approve & Publish Adjustment</h3>
                <p className="text-xs text-[#6b6b65] font-medium mt-0.5">{managerApprovalModal.title}</p>
              </div>
              <button onClick={() => setManagerApprovalModal(null)} className="text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-4 text-xs font-medium">
              <div className="space-y-1">
                <label className="font-bold uppercase tracking-wider text-slate-700">Agreed Date</label>
                <input type="text" value={mgrAgreedDate} onChange={(e) => setMgrAgreedDate(e.target.value)} className="w-full p-3 rounded-2xl border border-slate-300 font-bold" />
              </div>
              <div className="space-y-1">
                <label className="font-bold uppercase tracking-wider text-slate-700">Review Date</label>
                <input type="text" value={mgrReviewDate} onChange={(e) => setMgrReviewDate(e.target.value)} className="w-full p-3 rounded-2xl border border-slate-300 font-bold" />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setManagerApprovalModal(null)} className="px-4 py-2 font-semibold text-slate-600">Cancel</button>
                <button type="button" onClick={() => {
                  setPendingRequests(pendingRequests.filter(r => r.id !== managerApprovalModal.id));
                  setAdjustments([...adjustments, {
                    id: Date.now(),
                    title: managerApprovalModal.title,
                    category: managerApprovalModal.category,
                    details: managerApprovalModal.details,
                    status: 'Active',
                    approvedDate: mgrAgreedDate,
                    reviewDate: mgrReviewDate,
                    visibility: 'Line Manager & HR'
                  }]);
                  alert(`Request approved! Notification email sent to employee (${managerApprovalModal.employeeEmail}).`);
                  setManagerApprovalModal(null);
                }} className="px-6 py-2.5 font-bold text-white bg-[#00a782] hover:bg-[#008f6f] rounded-xl shadow-md">Confirm & Publish</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HR ESCALATION REVIEW MODAL */}
      {hrEscalationReviewModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 space-y-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">HR Escalation Review</h3>
                <p className="text-xs text-[#6b6b65] font-medium mt-0.5">{hrEscalationReviewModal.rule || hrEscalationReviewModal.title}</p>
              </div>
              <button onClick={() => setHrEscalationReviewModal(null)} className="text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-4 text-xs font-medium">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                <span className="font-bold text-slate-900">Option A: Approve & Publish</span>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Agreed Date</label>
                    <input type="text" value={hrAgreedDate} onChange={(e) => setHrAgreedDate(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300 font-bold" />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Review Date</label>
                    <input type="text" value={hrReviewDate} onChange={(e) => setHrReviewDate(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300 font-bold" />
                  </div>
                </div>
                <button onClick={() => {
                  if (hrEscalationReviewModal.type) {
                    setPcps(pcps.map(p => p.id === hrEscalationReviewModal.id ? { ...p, status: 'Active & Agreed' } : p));
                  } else {
                    setPendingRequests(pendingRequests.filter(r => r.id !== hrEscalationReviewModal.id));
                    setAdjustments([...adjustments, {
                      id: Date.now(),
                      title: hrEscalationReviewModal.title,
                      category: hrEscalationReviewModal.category,
                      details: hrEscalationReviewModal.details,
                      status: 'Active',
                      approvedDate: hrAgreedDate,
                      reviewDate: hrReviewDate,
                      visibility: 'Line Manager & HR'
                    }]);
                  }
                  alert(`Escalation approved by HR! Notification email sent to employee (${hrEscalationReviewModal.employeeEmail || employeeDetails.email}).`);
                  setHrEscalationReviewModal(null);
                }} className="w-full mt-3 py-2.5 bg-[#00a782] text-white font-extrabold rounded-xl shadow-sm">Approve & Publish</button>
              </div>

              <div className="p-4 bg-red-50/50 border border-red-200 rounded-2xl space-y-3">
                <span className="font-bold text-red-900 block">Option B: Cancel / Reject Request</span>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Reason for Cancellation</label>
                  <textarea rows="2" value={hrCancelReason} onChange={(e) => setHrCancelReason(e.target.value)} placeholder="Type reason for cancellation..." className="w-full p-2.5 rounded-xl border border-slate-300"></textarea>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Alternative Suggestion</label>
                  <textarea rows="2" value={hrAlternativeSuggestion} onChange={(e) => setHrAlternativeSuggestion(e.target.value)} placeholder="Type alternative suggestion..." className="w-full p-2.5 rounded-xl border border-slate-300"></textarea>
                </div>
                <button onClick={() => {
                  if (!hrCancelReason.trim()) {
                    alert('Please provide a reason for cancellation.');
                    return;
                  }
                  if (hrEscalationReviewModal.type) {
                    setPcps(pcps.map(p => p.id === hrEscalationReviewModal.id ? { ...p, status: `Cancelled: ${hrCancelReason}` } : p));
                  } else {
                    setPendingRequests(pendingRequests.filter(r => r.id !== hrEscalationReviewModal.id));
                  }
                  alert(`Request rejected by HR. Email sent to employee with reason: "${hrCancelReason}" and alternative: "${hrAlternativeSuggestion}".`);
                  setHrEscalationReviewModal(null);
                  setHrCancelReason('');
                  setHrAlternativeSuggestion('');
                }} className="w-full py-2.5 bg-[#d00000] text-white font-extrabold rounded-xl shadow-sm">Cancel & Send Feedback</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* COMPANY POLICY MODAL */}
      {showPolicyModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 space-y-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Company Policies & Compliance Documents</h3>
                <p className="text-xs text-[#6b6b65] font-medium mt-0.5">Official workplace guidelines and regulatory documentation.</p>
              </div>
              <button onClick={() => setShowPolicyModal(false)} className="text-slate-400 hover:text-slate-700"><X className="w-6 h-6" /></button>
            </div>

            {appRole === 'hr' && !hrInspectedEmployee && (
              <form onSubmit={handleUploadPolicy} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 block flex items-center gap-1.5">
                  <FileUp className="w-4 h-4 text-[#d00000]" /> Upload New Policy PDF Document
                </span>
                <div className="flex gap-2">
                  <input 
                    required
                    type="text" 
                    value={newPolicyNameInput}
                    onChange={(e) => setNewPolicyNameInput(e.target.value)}
                    placeholder="Enter policy document name..."
                    className="flex-1 p-3 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white"
                  />
                  <button type="submit" className="px-5 py-3 bg-[#d00000] hover:bg-[#b00000] text-white text-xs font-extrabold rounded-xl shadow-sm flex items-center gap-1.5">
                    <Upload className="w-4 h-4" /> Upload
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Available Documents ({companyPolicies.length})</span>
              <div className="space-y-2.5">
                {companyPolicies.map((policy) => (
                  <div key={policy.id} className="p-4 bg-white border border-slate-200 rounded-2xl flex items-center justify-between gap-4 shadow-sm">
                    <div onClick={() => setViewingPolicy(policy)} className="flex items-center gap-3.5 cursor-pointer flex-1 group">
                      <div className="w-10 h-10 rounded-xl bg-red-50 text-[#d00000] flex items-center justify-center font-bold">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#d00000]">{policy.name}</h4>
                        <span className="text-[11px] text-slate-400 font-semibold">{policy.fileType} · Click to view</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setViewingPolicy(policy)} className="px-4 py-2 bg-slate-100 text-slate-800 text-xs font-bold rounded-xl">View</button>
                      {appRole === 'hr' && !hrInspectedEmployee && (
                        <button onClick={() => handleDeletePolicy(policy.id)} className="p-2 rounded-xl bg-red-50 text-[#d00000]"><Trash2 className="w-4 h-4" /></button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button onClick={() => setShowPolicyModal(false)} className="px-6 py-2.5 font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-md text-xs">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* POLICY VIEWER POPUP */}
      {viewingPolicy && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-8 space-y-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#d00000] flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">{viewingPolicy.name}</h3>
                  <span className="text-xs text-[#00a782] font-bold">Official Document Viewer (Read-Only)</span>
                </div>
              </div>
              <button onClick={() => setViewingPolicy(null)} className="text-slate-400 hover:text-slate-700"><X className="w-6 h-6" /></button>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 text-xs font-medium text-slate-700 leading-relaxed">
              <div className="border-b border-slate-200 pb-3 font-mono text-[11px] text-slate-400 flex justify-between">
                <span>DOCUMENT ID: POL-2026-EN-081</span>
                <span>STATUS: ACTIVE & COMPLIANT</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">1. Purpose & Scope</h4>
              <p>This document outlines standard operating procedures and legal frameworks established under UK employment legislation.</p>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button onClick={() => setViewingPolicy(null)} className="px-6 py-2.5 font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-md text-xs">Close Document</button>
            </div>
          </div>
        </div>
      )}

      {/* CHANGE PROFILE PICTURE MODAL */}
      {showAvatarModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 space-y-6 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Change Profile Picture</h3>
                <p className="text-xs text-[#6b6b65] font-medium mt-0.5">Enter an image URL or upload your photo.</p>
              </div>
              <button onClick={() => setShowAvatarModal(false)} className="text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleAvatarSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold uppercase tracking-wider text-slate-700">Image URL</label>
                <input required type="url" value={tempAvatarInput} onChange={(e) => setTempAvatarInput(e.target.value)} placeholder="https://images.unsplash.com/photo-..." className="w-full p-3 rounded-2xl border border-slate-300 font-bold" />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setShowAvatarModal(false)} className="px-4 py-2 font-semibold text-slate-600">Cancel</button>
                <button type="submit" className="px-6 py-2.5 font-bold text-white bg-[#d00000] hover:bg-[#b00000] rounded-xl shadow-md">Update Avatar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT JOB ROLE MODAL */}
      {editingEmployee && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 space-y-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Edit Employee Role</h3>
                <p className="text-xs text-[#6b6b65] font-medium mt-0.5">Auto-syncs profile details across directory</p>
              </div>
              <button onClick={() => setEditingEmployee(null)} className="text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleSaveJobRole} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold uppercase tracking-wider text-slate-700">First Name</label>
                  <input required type="text" value={editFirstNameInput} onChange={(e) => setEditFirstNameInput(e.target.value)} className="w-full p-3 rounded-2xl border border-slate-300 font-bold" />
                </div>
                <div className="space-y-1">
                  <label className="font-bold uppercase tracking-wider text-slate-700">Last Name</label>
                  <input required type="text" value={editLastNameInput} onChange={(e) => setEditLastNameInput(e.target.value)} className="w-full p-3 rounded-2xl border border-slate-300 font-bold" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold uppercase tracking-wider text-slate-700">Company Email Address</label>
                <input required type="email" value={editEmailInput} onChange={(e) => setEditEmailInput(e.target.value)} className="w-full p-3 rounded-2xl border border-slate-300 font-bold" />
              </div>

              <div className="space-y-1">
                <label className="font-bold uppercase tracking-wider text-slate-700">Job Title</label>
                <input required type="text" value={editRoleInput} onChange={(e) => setEditRoleInput(e.target.value)} className="w-full p-3 rounded-2xl border border-slate-300 font-bold" />
              </div>

              <div className="space-y-1">
                <label className="font-bold uppercase tracking-wider text-slate-700">Department</label>
                <input required type="text" value={editDeptInput} onChange={(e) => setEditDeptInput(e.target.value)} className="w-full p-3 rounded-2xl border border-slate-300 font-bold" />
              </div>

              <div className="space-y-1">
                <label className="font-bold uppercase tracking-wider text-slate-700">Line Manager</label>
                <input required type="text" value={editManagerInput} onChange={(e) => setEditManagerInput(e.target.value)} className="w-full p-3 rounded-2xl border border-slate-300 font-bold" />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setEditingEmployee(null)} className="px-4 py-2 font-semibold text-slate-600">Cancel</button>
                <button type="submit" className="px-6 py-2.5 font-bold text-white bg-[#d00000] hover:bg-[#b00000] rounded-xl shadow-md">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TEAM MEMBER CARD DETAILS MODAL */}
      {selectedTeamMember && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 space-y-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#d00000] text-white flex items-center justify-center font-extrabold text-sm">
                  {selectedTeamMember.initials}
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">{selectedTeamMember.firstName} {selectedTeamMember.lastName}</h3>
                  <p className="text-xs text-[#6b6b65] font-medium">{selectedTeamMember.title} · {selectedTeamMember.department}</p>
                  <p className="text-[11px] text-slate-400 font-semibold">{selectedTeamMember.email}</p>
                </div>
              </div>
              <button onClick={() => setSelectedTeamMember(null)} className="text-slate-400 hover:text-slate-700"><X className="w-6 h-6" /></button>
            </div>

            <div className="space-y-6 pt-2">
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Agreed Accommodations ({selectedTeamMember.adjustments.length})</h4>
                {selectedTeamMember.adjustments.length === 0 ? (
                  <p className="text-xs text-slate-500">No active adjustments recorded for this team member card.</p>
                ) : (
                  <div className="space-y-3">
                    {selectedTeamMember.adjustments.map((adj, idx) => (
                      <div key={idx} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-extrabold text-slate-900">{adj.title}</span>
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#00a782] border border-emerald-200">{adj.status}</span>
                        </div>
                        <p className="text-xs text-slate-700 font-medium">{adj.details}</p>
                        <span className="text-[11px] text-slate-400 font-semibold block pt-1">Review Date: {adj.reviewDate}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Role Standards & Work Practices</h4>
                <div className="space-y-3">
                  {pcps.map((pcp) => (
                    <div key={pcp.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="font-black text-[#d00000] uppercase text-[10px]">{pcp.type}</span>
                        <span className="font-bold text-slate-500">{pcp.status}</span>
                      </div>
                      <div className="font-bold text-slate-900">{pcp.rule}</div>
                      <div className="text-slate-600"><strong>Objective:</strong> {pcp.aim}</div>
                      {pcp.alternative && (
                        <div className="text-slate-700 bg-blue-50/60 p-2.5 rounded-xl border border-blue-200 mt-1">
                          <strong className="text-blue-900">Alternative:</strong> {pcp.alternative}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button onClick={() => setSelectedTeamMember(null)} className="px-6 py-2.5 font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-md text-xs">Close Card</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
