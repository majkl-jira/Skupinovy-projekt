import { Calendar, Link, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function BlogCard({ blog }) {

const navigate = useNavigate();

const handleOpenBlog = () => {
  navigate(`/blogpost/${blog.id}`)
}

  return (
    <div className="relative rounded-sm">
      <div className="flex flex-col h-full">
        <div className="relative w-full h-48">
          <img
            src={blog.image}
            className="object-cover h-full w-full"
          ></img>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/50">
            <div className="absolute bottom-0 left-0 right-0 z-20 p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs">
                  <Calendar className="size-4 text-white"></Calendar>
                  <p>{blog.date}</p>
                </div>
                <div className="flex items-center">
                  <Button onClick={handleOpenBlog}>Otevrit</Button>
                </div>
              </div>
            </div>
            <div className="relative flex items-center justify-start h-full px-12">
              <p className="text-xl">{blog.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
