// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001/api';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Call external API
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password
    });

    const { accessToken, refreshToken, user } = response.data.data;

    // Create response with tokens in cookies
    const res = NextResponse.json({
      success: true,
      message: 'Login successful',
      data: { user }
    });

    // Set secure cookies
    res.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    res.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30 // 30 days
    });

    return res;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { 
        error: error.response?.data?.message || 'Login failed',
        success: false 
      },
      { status: error.response?.status || 500 }
    );
  }
}

// app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001/api';

export async function POST(request: NextRequest) {
  try {
    const accessToken = request.cookies.get('accessToken')?.value;

    if (accessToken) {
      // Call external API to logout
      try {
        await axios.post(`${API_BASE_URL}/auth/logout`, {}, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
      } catch (error) {
        // Continue with logout even if external API fails
        console.error('External logout failed:', error);
      }
    }

    // Create response and clear cookies
    const res = NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    });

    res.cookies.delete('accessToken');
    res.cookies.delete('refreshToken');

    return res;
  } catch (error: any) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Logout failed', success: false },
      { status: 500 }
    );
  }
}

// app/api/auth/refresh/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001/api';

export async function POST(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get('refreshToken')?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { error: 'No refresh token found', success: false },
        { status: 401 }
      );
    }

    // Call external API to refresh token
    const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {}, {
      headers: {
        Authorization: `Bearer ${refreshToken}`
      }
    });

    const { accessToken, refreshToken: newRefreshToken } = response.data.data;

    // Update cookies with new tokens
    const res = NextResponse.json({
      success: true,
      message: 'Token refreshed successfully'
    });

    res.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    if (newRefreshToken) {
      res.cookies.set('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30 // 30 days
      });
    }

    return res;
  } catch (error: any) {
    console.error('Token refresh error:', error);
    
    // Clear invalid tokens
    const res = NextResponse.json(
      { error: 'Token refresh failed', success: false },
      { status: 401 }
    );
    
    res.cookies.delete('accessToken');
    res.cookies.delete('refreshToken');
    
    return res;
  }
}

// app/api/user/profile/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001/api';

export async function GET(request: NextRequest) {
  try {
    const accessToken = request.cookies.get('accessToken')?.value;

    if (!accessToken) {
      return NextResponse.json(
        { error: 'No access token found', success: false },
        { status: 401 }
      );
    }

    // Call external API
    const response = await axios.get(`${API_BASE_URL}/user/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return NextResponse.json({
      success: true,
      data: response.data.data,
      message: response.data.message
    });
  } catch (error: any) {
    console.error('Get profile error:', error);
    
    if (error.response?.status === 401) {
      return NextResponse.json(
        { error: 'Unauthorized', success: false },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to fetch profile', success: false },
      { status: 500 }
    );
  }
}

// app/api/medical/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001/api';

// GET all medical info
export async function GET(request: NextRequest) {
  try {
    const accessToken = request.cookies.get('accessToken')?.value;

    if (!accessToken) {
      return NextResponse.json(
        { error: 'No access token found', success: false },
        { status: 401 }
      );
    }

    const response = await axios.get(`${API_BASE_URL}/user/user-medical`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return NextResponse.json({
      success: true,
      data: response.data.data,
      message: response.data.message
    });
  } catch (error: any) {
    console.error('Get medical info error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch medical info', success: false },
      { status: error.response?.status || 500 }
    );
  }
}

// POST create medical info
export async function POST(request: NextRequest) {
  try {
    const accessToken = request.cookies.get('accessToken')?.value;

    if (!accessToken) {
      return NextResponse.json(
        { error: 'No access token found', success: false },
        { status: 401 }
      );
    }

    const body = await request.json();

    const response = await axios.post(`${API_BASE_URL}/user/user-medical`, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    return NextResponse.json({
      success: true,
      data: response.data.data,
      message: response.data.message
    });
  } catch (error: any) {
    console.error('Create medical info error:', error);
    return NextResponse.json(
      { error: 'Failed to create medical info', success: false },
      { status: error.response?.status || 500 }
    );
  }
}

// app/api/medical/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001/api';

// GET specific medical info
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const accessToken = request.cookies.get('accessToken')?.value;

    if (!accessToken) {
      return NextResponse.json(
        { error: 'No access token found', success: false },
        { status: 401 }
      );
    }

    const response = await axios.get(`${API_BASE_URL}/user/user-medical/${params.id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return NextResponse.json({
      success: true,
      data: response.data.data,
      message: response.data.message
    });
  } catch (error: any) {
    console.error('Get medical info error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch medical info', success: false },
      { status: error.response?.status || 500 }
    );
  }
}

// PATCH update medical info
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const accessToken = request.cookies.get('accessToken')?.value;

    if (!accessToken) {
      return NextResponse.json(
        { error: 'No access token found', success: false },
        { status: 401 }
      );
    }

    const body = await request.json();

    const response = await axios.patch(`${API_BASE_URL}/user/user-medical/${params.id}`, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    return NextResponse.json({
      success: true,
      data: response.data.data,
      message: response.data.message
    });
  } catch (error: any) {
    console.error('Update medical info error:', error);
    return NextResponse.json(
      { error: 'Failed to update medical info', success: false },
      { status: error.response?.status || 500 }
    );
  }
}

// DELETE medical info
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const accessToken = request.cookies.get('accessToken')?.value;

    if (!accessToken) {
      return NextResponse.json(
        { error: 'No access token found', success: false },
        { status: 401 }
      );
    }

    const response = await axios.delete(`${API_BASE_URL}/user/user-medical/${params.id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return NextResponse.json({
      success: true,
      message: response.data.message
    });
  } catch (error: any) {
    console.error('Delete medical info error:', error);
    return NextResponse.json(
      { error: 'Failed to delete medical info', success: false },
      { status: error.response?.status || 500 }
    );
  }
}

// app/api/medical/generate-slip/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001/api';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const accessToken = request.cookies.get('accessToken')?.value;

    if (!accessToken) {
      return NextResponse.json(
        { error: 'No access token found', success: false },
        { status: 401 }
      );
    }

    const response = await axios.post(`${API_BASE_URL}/medical/generate-slip/${params.id}`, {}, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return NextResponse.json({
      success: true,
      data: response.data.data,
      message: response.data.message
    });
  } catch (error: any) {
    console.error('Generate slip error:', error);
    return NextResponse.json(
      { error: 'Failed to generate slip', success: false },
      { status: error.response?.status || 500 }
    );
  }
}