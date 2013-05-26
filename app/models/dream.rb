class Dream < ActiveRecord::Base
	attr_accessible :story

	validates :story, presence: true
end