import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { useNavigate } from "react-router-dom";

const CourseUrlChange = () => {
    const [formData, setFormData] = useState({
        courseId: "",
        newUrl: "",
    });
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch("https://bionic-backend-7v9q.onrender.com/courses", {
                // const response = await fetch("http://localhost:3001/courses", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
                    },
                });

                if (response.status === 401) {
                    navigate("/login");
                    return;
                }

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }
                const data = await response.json();
                setCourses(data);
            } catch (err) {
                setError("Failed to load courses");
            }
        };

        fetchCourses();
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === "selectedCourse") {
            updateCourseUrl(value);
        }
    };

    const updateCourseUrl = (courseId) => {
        const selectedCourseData = courses.find((course) => course.id === courseId);
        setFormData((prev) => ({
            ...prev,
            courseUrl: selectedCourseData ? selectedCourseData.defaultUrl : "",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);


        try {
            const response = await fetch("https://bionic-backend-7v9q.onrender.com/courses/update", {
            // const response = await fetch("http://localhost:3001/courses/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
                },
                body: JSON.stringify({
                    courseId: formData.courseId,
                    newUrl: formData.newUrl,
                }),
            });

            if (response.ok) {
                setSuccess("User created successfully!");
                setFormData({
                    courseId: "",
                    newUrl: "",
                });
            } else if (response.status === 401) {
                navigate("/login");
                return;
            } else {
                const data = await response.json();
                setError(data.message || "Failed to update url");
            }
        } catch (err) {
            setError("Failed to update url");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Change Course Url</CardTitle>
                </CardHeader>
                <CardContent>
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                            {success}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">New URL</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Select Course</label>
                            <select
                                name="selectedCourse"
                                value={formData.selectedCourse}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                required
                            >
                                <option value="">Select a course</option>
                                {courses.map((course) => (
                                    <option key={course.id} value={course.id}>
                                        {course.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                            disabled={loading}
                        >
                            {loading ? "updating..." : "Update Url"}
                        </button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CourseUrlChange;
