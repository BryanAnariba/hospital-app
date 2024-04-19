export interface HospitalsResponse {
    hospitals:      Hospital[];
    totalHospitals: number;
    previusPage:    string;
    currentPage:    string;
    nextPage:       string;
    skip:           number;
    limit:          number;
}

export interface HospitalResponse {
    _id:       string;
    name:      string;
    email:     string;
    img:       string;
    isActive:  boolean;
    user:      string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Hospital {
    _id:       string;
    name:      string;
    email:     string;
    img:       string;
    isActive:  boolean;
    user:      UserCreatedHospital;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserCreatedHospital {
    _id:  string;
    name: string;
}