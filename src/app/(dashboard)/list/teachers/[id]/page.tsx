import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import FormContainer from "@/components/FormContainer";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Teacher } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const SingleTeacherPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const teacher:
    | (Teacher & {
        _count: { subjects: number; lessons: number; classes: number };
      })
    | null = await prisma.teacher.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          subjects: true,
          lessons: true,
          classes: true,
        },
      },
    },
  });

  if (!teacher) {
    return notFound();
  }

  return (
    <div className="flex flex-col xl:flex-row p-4 gap-6">
      {/* LEFT SECTION */}
      <div className="w-full xl:w-2/3 flex flex-col gap-6">
        {/* USER PROFILE CARD */}
        <div className="flex flex-col md:flex-row bg-[#d6f0fc] rounded-2xl p-6 shadow-md gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0 flex justify-center">
            <Image
              src={teacher.img || "/noAvatar.png"}
              alt="Profile"
              width={144}
              height={144}
              className="rounded-full object-cover border-4 border-white shadow-md w-36 h-36"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4 flex-1 justify-center">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-800">
                {teacher.name + " " + teacher.surname}
              </h2>
              {role === "admin" && (
                <FormContainer table="teacher" type="update" data={teacher} />
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <Image src="/blood.png" alt="Blood" width={16} height={16} />
                <span>{teacher.bloodType || "-"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Image src="/date.png" alt="DOB" width={16} height={16} />
                <span>
                  {new Intl.DateTimeFormat("en-GB").format(teacher.birthday)}
                </span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <Image src="/mail.png" alt="Email" width={16} height={16} />
                <span className="truncate">{teacher.email || "-"}</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <Image src="/phone.png" alt="Phone" width={16} height={16} />
                <span>{teacher.phone || "-"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* CARD TEMPLATE */}
          {/* <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
            <Image src="/singleAttendance.png" alt="" width={32} height={32} />
            <div>
              <h3 className="text-xl font-semibold">90%</h3>
              <p className="text-sm text-gray-500">Attendance</p>
            </div>
          </div> */}
          <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
            <Image src="/singleBranch.png" alt="" width={32} height={32} />
            <div>
              <h3 className="text-xl font-semibold">{teacher._count.subjects}</h3>
              <p className="text-sm text-gray-500">Branches</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
            <Image src="/singleLesson.png" alt="" width={32} height={32} />
            <div>
              <h3 className="text-xl font-semibold">{teacher._count.lessons}</h3>
              <p className="text-sm text-gray-500">Lessons</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
            <Image src="/singleClass.png" alt="" width={32} height={32} />
            <div>
              <h3 className="text-xl font-semibold">{teacher._count.classes}</h3>
              <p className="text-sm text-gray-500">Classes</p>
            </div>
          </div>
        </div>

        {/* CALENDAR SECTION */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Teacher&apos;s Schedule</h2>
          <div className="h-[800px]">
            <BigCalendarContainer type="teacherId" id={teacher.id} />
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="w-full xl:w-1/3 flex flex-col gap-6">
        {/* SHORTCUTS */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Shortcuts</h2>
          <div className="flex flex-wrap gap-3 text-xs">
            <Link
              className="p-2 bg-lamaSkyLight rounded-md"
              href={`/list/classes?supervisorId=${teacher.id}`}
            >
              Teacher&apos;s Classes
            </Link>
            <Link
              className="p-2 bg-lamaPurpleLight rounded-md"
              href={`/list/students?teacherId=${teacher.id}`}
            >
              Teacher&apos;s Students
            </Link>
            <Link
              className="p-2 bg-lamaYellowLight rounded-md"
              href={`/list/lessons?teacherId=${teacher.id}`}
            >
              Teacher&apos;s Lessons
            </Link>
            <Link
              className="p-2 bg-pink-50 rounded-md"
              href={`/list/exams?teacherId=${teacher.id}`}
            >
              Teacher&apos;s Exams
            </Link>
            <Link
              className="p-2 bg-lamaSkyLight rounded-md"
              href={`/list/assignments?teacherId=${teacher.id}`}
            >
              Teacher&apos;s Assignments
            </Link>
          </div>
        </div>

        {/* ANNOUNCEMENTS */}
        <Announcements />
      </div>
    </div>
  );
};

export default SingleTeacherPage;
