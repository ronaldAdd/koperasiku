
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface EditorFrameProps {
  frameRef: React.RefObject<HTMLDivElement>;
  isEditorReady: boolean;
}

const EditorFrame = ({ frameRef, isEditorReady }: EditorFrameProps) => {
  return (
    <Card>
      <CardContent className="p-0">
        <div 
          ref={frameRef}
          className="w-full"
          style={{ minHeight: '600px' }}
        />
        {!isEditorReady && (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p>Memuat OnlyOffice Editor...</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EditorFrame;
