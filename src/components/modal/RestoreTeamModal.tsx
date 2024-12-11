import { Team } from '../../types/types';

interface RestoreTeamsModalProps {
  deletedTeams: Team[];
  onRestore: (team: Team) => void;
  onClose: () => void;
}

export function RestoreTeamsModal({ deletedTeams, onRestore, onClose }: RestoreTeamsModalProps) {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg p-6 max-w-md w-full"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">Restore Deleted Teams</h2>
        {deletedTeams.length === 0 ? (
          <p className="text-gray-500">No deleted teams to restore</p>
        ) : (
          <div className="space-y-2">
            {deletedTeams.map(team => (
              <div 
                key={team.id}
                className="flex items-center justify-between p-3 border rounded hover:bg-gray-50 cursor-pointer"
                onClick={() => onRestore(team)}
              >
                <div className="flex items-center gap-2">
                  {team.logo ? (
                    <img src={team.logo} alt="" className="w-8 h-8" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-sm font-bold">{team.school.charAt(0)}</span>
                    </div>
                  )}
                  <span>{team.school}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}