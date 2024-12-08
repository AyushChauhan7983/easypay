import React, { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import { Modal } from "antd";
import "react-calendar/dist/Calendar.css";

const HolidayCalendarModal = ({ onClose }) => {
    const [holidays, setHolidays] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        const fetchHolidays = async () => {
            try {
                const response = await axios.get(
                    `https://calendarific.com/api/v2/holidays?api_key=5VhYJ3GItuqFKTgLk5gvKYDWrmPOEtX1&country=IN&year=${new Date().getFullYear()}`
                );
                setHolidays(response.data.response.holidays);
            } catch (error) {
                console.error("Error fetching holidays:", error);
            }
        };

        fetchHolidays();
    }, []);

    const highlightHolidays = ({ date, view }) => {
        if (view === "month") {
            const holiday = holidays.find(
                (holiday) =>
                    new Date(holiday.date.iso).toDateString() === date.toDateString()
            );
            if (holiday) {
                return (
                    <div className="flex flex-col justify-between items-center h-full text-red-500 font-bold text-xs">
                        <small>{holiday.name}</small>
                    </div>
                );
            }
        }
        return null;
    };

    return (
        <Modal
            title="Holiday Calendar"
            open={true}
            onCancel={onClose}
            footer={null}
            centered
            width={500}
            bodyStyle={{ padding: 0, overflow: "hidden" }}
        >
            <div className="flex justify-center items-center">
                <Calendar
                    onChange={setSelectedDate}
                    value={selectedDate}
                    tileContent={highlightHolidays}
                    className="holiday-calendar"
                    tileClassName="flex flex-col justify-start items-center h-24"
                />
            </div>
        </Modal>
    );
};

export default HolidayCalendarModal;
